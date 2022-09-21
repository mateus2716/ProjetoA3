var express = require('express');
var bodyparser = require('body-parse');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extends: true}));
app.use(cors());

mongoose.connect('mongoose://localhost:27017/auth_test',
    {useNewUrlParser: true});

app.use(function(req, res, next){
    res.status(404).send('Not found');
})

app.listen(3000);