var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

//both used for maintaining session
var cookieParser = require('cookie-parser');
var session = require('express-session');

var multer = require('multer');
var passport = require('passport');
var localStrategy = require('passport-local');


var app = express();

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer());

app.use(session({secret: 'harshil',
    resave: false,
    saveUninitialized: true}));

/*app.set('trust proxy', 1) // trust first proxy
 app.use(session({
 secret: 'keyboard cat',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: true }
 }))*/

app.use(cookieParser())
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

//make sure C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe is running
db = mongoose.connect('mongodb://localhost/CS5610');

//assiggments
require("./public/assignment/server/app.js")(app, db, mongoose);

//projects
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


/*-------------------------------------MONGODB-------------------------------------------*/

// use remote connection string
// if running in remote server


/*var CourseSchema = new mongoose.Schema({
    title : String,
    seats : {type : Number, default : 15}
}, {collection : "course"});
*/

/*
var CourseModel = mongoose.model("CourseModel", CourseSchema)

CourseModel.create({title : "C#", seats : 30},
    function (err,results){
        if(!err){
            console.log(results);
        }
    }
);*/

//CourseModel.create({title : "J2EE", seats : 20});
//CourseModel.create({title : "Python", seats : 50});
//
app.listen(port, ipaddress);
