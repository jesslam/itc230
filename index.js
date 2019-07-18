"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = require("./lib/album.js");
/* const qs = require("querystring");
const http = require("http")
const fs = require("fs");  */

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + "./public")); //set location for static files
app.use(bodyParser.urlencoded({extended: true})); //parse form submissions

const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html"); 

/* //send static file as response
app.get('/', (req, res) => {
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html');
}); */

//send content of 'home' view
app.get('/', (req, res) => {
    res.render('home', {library: data.getAll()});
});

//send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

app.get('/delete', (req, res) => {
    let result = data.deleteItem(req.query.album); //delete book object
    let liblength = data.getAll().length;
    res.render("delete", {
        album: req.query.album,
        result: result,
        length: liblength,
        query: req.body.keyword

    });
    console.log(req.query.album); //display parsed querystring object
});

app.get('/detail', (req, res) => {
    let found = data.getItem(req.query.album); //get album object
    res.render("detail", {
        artist: req.query.artist,
        song: req.query.song,
        result: found
    });
});

//handle form submit response
app.post('/detail', (req, res) => {
    console.log(req.body);
    // res.type('text/html');
    let found = data.getItem(req.body.keyword);
    res.render('detail', {
        artist: req.body.artist,
        song: req.body.song,
        result: found,
        album: data.getAll(),
        query: req.body.keyword
    });
});

//define 404 handler
app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started at ' + __dirname);
});

/* //http server listen request response
http.createServer((req, res) => {
    let url = req.url.split("?"); //separate url from querystring
    let query = qs.parse(url[1]); //convert querystring to object
    let path = url[0].toLowerCase();
 */
/*     switch(path) {
        case '/':
            // const fs = require("fs");
            fs.readFile("./public/home.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end(data.toString());
            });
            break;

        case '/about':
            fs.readFile("./public/about.html", (err, data) => {
                if (err) return console.error(err),
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;

        case '/detailall':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let all = data.getAll();
            let allresults = (all) ? JSON.stringify(all) : "Not Found";
            res.write('All results are:' + "\n" + allresults);
            res.end("");     
            break;

        case '/detail':
            let found = data.getItem(query.album); //get album object
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found) : "Not Found";
            res.end('Results for ' + query.album + '\n' + results);
            break;

        case '/delete':
            let find = data.deleteItem(query.album); //find album by index
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let del = (find) ? JSON.stringify(find) : "Not Deleted";
            res.end(query.album + " has been " + del);
            
            break; 

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 - Page not found')
            break;
    }
}).listen(process.env.PORT || 3000);
 */

