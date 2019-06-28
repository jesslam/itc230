//require http
const http = require("http");

const server = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(`
    <!DOCTYPE HTML>
    <html>
    <head>
        <title>Jess Lam ITC 230</title>
    </head>
    <body>
        <h1>Welcome to my page</h1>
        <h2>Page under construction</h2>
    </body>
    </html>`);

})

server.listen(3000);