"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const router = express.Router();
//const data = require("./lib/album.js");
const Albums = require("./models/album.js");
/* const qs = require("querystring");
const http = require("http")
const fs = require("fs");  */

app.set('port', process.env.PORT || 3000);
//app.use(albumRoute);
app.use(express.static(__dirname + "./public")); //set location for static files
app.use(bodyParser.urlencoded({extended: true})); //parse form submissions
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

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
    Albums.find({}, (err, items) => {
        if (err) return next(err);
        //console.log(items.length);
        res.render('home', {library: items });
    });
});

//send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

app.get('/delete', (req, res) => {
        Albums.deleteOne({album: req.query.album}, (err, result) => {
            if (err) return next(err);
            //console.log(result);
            Albums.countDocuments({},(err, count) => {
                res.type('text/html');
                res.render("delete", {
                    album: req.query.album, 
                    count: count,
                    deleted: (result.deletedCount>0) 
            });
        });
    });
});

app.get('/detail', (req, res) => {
    Albums.findOne({'album' : req.query.album}, (err, item) => {
        if (err) return next(err);
        console.log(item);
        res.type('text/html');
        res.render("detail", {
            result: {result:true},
            result: item,
            query: req.query.album,
        });
      }); 
}); 

//handle form submit response
app.post('/detail', (req, res) => {
    Albums.findOne({'album' : req.query.album}, (err, item) => {
        if (err) return next(err);
        console.log(item);
        res.type('text/html');
        res.render("detail", {
            result: {result:true},
            result: item,
            query: req.query.keyword
        });
    });
});

//add to data module
app.post('/add', (req, res) => {
    let newEntry = {'artist': req.body.artist, 'song': req.body.song, 'album': req.body.album};
    Albums.updateOne({'album': req.body.album}, newEntry, {upsert:true}, (err, result) => {
        console.log({result});
        if (err) return (err);
        res.type('text/html');
        Albums.countDocuments({},(err, count)=> {
            res.render('add', {
                result: req.body,
                count: count
            });
        });
    });
});

// apis

//get all collection documents
app.get('/api/catalog', (req, res, next) => {
    Albums.find((err, result) => {
        if (err || !result) return next(err);
        res.json(result);
    })
})

//get one doc from collection
app.get('/api/catalog/:album', (req, res, next) => {
    let album = req.params.album
    console.log(album);
    Albums.findOne({album:album},(err, result) => {
        if (err || !result) return next(err);
        res.json(result);
    });
});

//find and update an existing doc in the collection or add new
app.post('/api/add/', (req, res) => {
    let newEntry = {'artist': req.body.artist, 'song': req.body.song, 'album': req.body.album};
    Albums.updateOne({'album': req.body.album}, newEntry, {upsert:true}, (err, result) => {
        //console.log({result});
        if (err) return (err);
        Albums.countDocuments({},(err, count)=> {
            res.json({
                result: result.n + ' doc was added.',
                count: count
            });
        });
    });
});

//delete a doc from collection
app.get('/api/delete/', (req, res) => {
    Albums.deleteOne({'album': req.query.album}, (err, result) => {
        if (err || !result) return next(err);
        //console.log({result});
        Albums.countDocuments({}, (err, count) => {
            res.json({
                result: result.n + ' doc was deleted.',
                count: count,
                deleted: (result.deletedCount>0) 
            });
        });
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
