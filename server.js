#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.get('/', function(req, res){
    res.send('hello my friend');
});

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);

app.get('/api/users', function (req,res) {
   var users = [
       {username: 'harshil', first: 'Harshil', last: 'Vasani'},
       {username: 'harshil2', first: 'Harshil2', last: 'Vasani2'},
       {username: 'harshil3', first: 'Harshil3', last: 'Vasani3'}
   ];
    res.json(users);
    //res.send(users); also works its just we knew the format so used .json
});

app.listen(3000);