#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app      = express();

app.use(express.static(__dirname + '/public'));

app.get('/say/hello',sayHello);
function sayHello(req,res){
    res.send('hello everyone');
}

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