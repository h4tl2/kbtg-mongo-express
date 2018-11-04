var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
app.use(bodyParser.json());

Genre = require('./models/genre')
Book = require('./models/book');
// connect to Mongoose
mongoose.connect('');
var db = mongoose.connection;

app.get('/',function(req,res){
    res.send('Please user /api/books or /api/genres');
});

app.get('/api/genres',function(req,res){
    Genre.getGenres(function(err,genres){
        if(err){
            console.log("ERROR")
            console.log(err);//throw err;
            //res.send(err);
        }
        res.json(genres);
    })
});
app.post('/api/genres',function(req,res){
    var genre = req.body;
    console.log(genre);
    Genre.addGenre(genre,function(genre,err){
        if(err){
            console.log("ERROR")
            console.log(err);//throw err;
            //res.send(err);
        }
        res.json(genre);
    });
});

app.get('/api/books',function(req,res){
    Book.getBooks(function(err,books){
        if(err){
            console.log("ERROR")
            console.log(err);//throw err;
        }
        res.json(books);
    })
});

app.get('/api/books/:_id',function(req,res){
    Book.getBookById(req.params._id,function(err,book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});

app.listen(3000,function(){
    console.log("start on port 3000");
});

