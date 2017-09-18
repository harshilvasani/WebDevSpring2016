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

var fs = require('fs');

var connectionString = 'mongodb://127.0.0.1:27017/CS5610';

// use remote connection string
// if running in remote server
if(process.env.MLAB_USERNAME_WEBDEV) {
    // connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //     process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //     process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //     process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //     process.env.OPENSHIFT_APP_NAME;

    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += 'ds141534.mlab.com:41534/heroku_rq8bm6xt';
}
console.log(process.env.MLAB_USERNAME_WEBDEV)
console.log(connectionString)
// connect to the database
var db = mongoose.connect(connectionString);



var app = express();

var multer = require('multer');
var upload = multer({ dest: './uploads',
    rename: function (fieldname, filename){
    return filename }});


/*var ImageSchema = new mongoose.Schema({
 img: { data: Buffer, contentType: String }
}, {collection : "image"});

var ImageModel = mongoose.model("ImageModel", ImageSchema)
var newItem = new ImageModel();

app.get('/api/photo',function(req,res){

    newItem.img.data = fs.readFileSync("har.png");
    newItem.img.contentType = 'image/png';
    newItem.save();
    res.json("done..");
});

app.get('/api/getPhoto', function (req, res, next) {
    ImageModel.find( function (err, doc) {
        if (err)
            return next(err);
        res.contentType(doc[0].img.contentType);
        res.send(doc[0].img.data);
    });
});
*/

app.post('/upload', function (req, res) {

    // get file object from request
    var myFile = req.files.myFile;

    // path where file was written
    var path = myFile.path;

    console.log(path);
    // original file name
    var name = myFile.name;

    var size = myFile.size;
    var type = myFile.type;

    res.send(200);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.urlencoded({ uploadDir: './uploads', extended: true,keepExtensions:true }));

var urlencodedParser = bodyParser.urlencoded({extended: true});
//app.use(multer());
//console.log( process.env.SESSION_SECRET);
if(!process.env.SESSION_SECRET){
    process.env.SESSION_SECRET = "secret_key";
}

app.use(session({ secret:  process.env.SESSION_SECRET,
    resave : true,
    saveUninitialized : true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.PORT || 3000;

console.log(process.env.PORT);

//console.log(process.env.PASSPORT_SECRET);

require("./public/assignment/server/app.js")(app,db,mongoose,LocalStrategy);
require("./public/project/server/app.js")(app,db,mongoose,LocalStrategy);

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
app.listen(port, ipaddress);