#!/bin/env node
//  OpenShift sample Node application
var express = require('express'); // require is keyword to include other library.
var app = express();// app is instance of express library

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){// tells what to do when certain Http requests comes in
    res.send('hello my friend......');
});

app.get('/api/users'/*are called routs*/, function (req,res) {
   var users = [
       {username: 'harshil', first: 'Harshil', last: 'Vasani'},
       {username: 'harshil2', first: 'Harshil2', last: 'Vasani2'},
       {username: 'harshil3', first: 'Harshil3', last: 'Vasani3'}
   ];
    res.json(users);
    //res.send(users); also works its just we knew the format so used .json
});

app.listen(port, ipaddress);
//app.listen(3000);

