var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('https');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/CS5610';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
var urlencodedParser = bodyParser.urlencoded({extended: true});
//app.use(multer());
app.use(session({ secret: "Bansal" ,
    resave : true,
    saveUninitialized : true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//console.log(process.env.PASSPORT_SECRET);

require("./public/assignment/server/app.js")(app,db,mongoose);
require("./public/project/server/app.js")(app);

var urlencodedParser = bodyParser.urlencoded({extended: true});


app.post('/maps', urlencodedParser, function (req, results) {

    var URL="https://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";
    var a=URL.replace("ORIGIN",req.body.origin);
    var b=a.replace("DESTINATION",req.body.destination);

    request({
        url: b,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            results.json(body);
        }
    });

});
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);