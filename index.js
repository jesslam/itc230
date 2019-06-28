//require http
const http = require("http");
http.createServer((req, res) => {
    const path = req.url.toLowerCase();
    switch(path) {
        case '/':
            const fs = require("fs");
            fs.readFile("public/home.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end(data.toString());
            });
            break;

        case '/about':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('About page');
            break;
        
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 - Page not found')
            break;
    }
}).listen(process.env.PORT || 3000);