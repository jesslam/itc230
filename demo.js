const http = require("http"); 
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
        const fs = require("fs");
        console.log("step 1")
        fs.readFile("home2.html", (err, data) => {
            console.log("step 2")
            if (err) return console.error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data.toString());
            console.log("step 3")
        });
    //   res.writeHead(200, {'Content-Type': 'text/plain'});
    //   res.end('Home page');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);