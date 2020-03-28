const http = require('http');
const fileSistem = require('fs');
const path = require('path');

const hostname = 'localhost'
const port = 3000


const server = http.createServer((request, response) => {
    if(request.method == 'GET') {
        var fileUrl
        console.log(request.url)
        if(request.url == '/') {
            fileUrl = 'index.html'
        } else {
            fileUrl = request.url
        }
        var filePath = path.resolve(`./public/${fileUrl}`)
        const fileExtension = path.extname(filePath)
        if(fileExtension == '.html') {
            fileSistem.exists(filePath, (exist) => {
                if(!exist) {
                    response.statusCode = 404;
                    response.setHeader('Content-Type', 'text/html');
                    response.end(`<html><body><h1>Error 404: file ${fileUrl} Not found</h1></body></html>`);
                    return;
                }
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                fileSistem.createReadStream(filePath).pipe(response);
            })
        } else {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html');
            response.end(`<html><body><h1>Error 404: file ${fileUrl} is not an html file</h1></body></html>`);
            return;
        }

    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end(`<html><body><h1>Error 404: Request Method: ${request.method} not supported</h1></body></html>`);
        return;
    }
})


server.listen(port, hostname, () => {
    console.log(`Server is running at http//:${hostname}:${port}`)
})