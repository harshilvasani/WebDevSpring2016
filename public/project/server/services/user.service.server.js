module.exports = function(app,userModel,LocalStrategy) {

    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var auth = authorized;
    passport.use('project', new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ("/api/project/login", passport.authenticate('project'), login);
    app.post  ("/api/project/logout",                          logout);
    app.get   ("/api/project/user",                            findAllUsers);
    app.get   ("/api/project/company/:company/manager",        findAllManagersByCompany);
    app.get   ("/api/project/city/:city/state/:state/manager", findAllManagersByLocation);
    app.get   ("/api/project/company/:company/city/:city/state/:state/manager", findAllManagersByLocationandComapany);
    app.post  ("/api/project/user",                            createUser);
    app.put   ("/api/project/user/:id",                 auth,  updateUser);
    app.post  ("/api/project/manager",                         createManager);
    app.put   ("/api/project/manager/:id",              auth,  updateManager);
    app.delete("/api/project/user/:id",                 auth,  deleteUser);
    app.get   ("/api/project/loggedin",                        loggedin);
    app.get   ("/api/project/getCurOwner",                     getCurOwner);
    app.post  ("/api/project/setCurOwner",                     setCurOwner);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done){
        var user = null;

        userModel
            .findUserByUsername(username)
            .then(
                function (doc) {
                    user = doc;

                    if(user && bcrypt.compareSync(password,user.password))
                    {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                // reject promise if error
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
       // console.log(user);
        res.json(user);
    }

    function loggedin(req, res) {
        //console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function getCurOwner(req,res){

        if(req.session.currentOwner != null){
            res.json(req.session.currentOwner);
        }
        else
            res.json(null);

    }

    function setCurOwner(req,res){
        var curOwner = req.body;
        req.session.currentOwner = curOwner;
        res.json(req.session.currentOwner);
    }

    function findAllUsers(req,res){

        userModel
            .findAllUsers()
            .then(
                function (doc) {
                    var users = doc;
                    res.json(users);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllManagersByCompany(req,res){

        var company = req.params.company;

        userModel
            .findAllManagersByCompany(company)
            .then(
                function (doc) {
                    var managers = doc;
                    res.json(managers);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllManagersByLocationandComapany(req,res){

        var city = req.params.city;
        var state = req.params.state;
        var company = req.params.company

        userModel
            .findAllManagersByLocationandComapany({"city" : city, "state" : state},company)
            .then(
                function (doc) {
                    var managers = doc;
                    res.json(managers);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllManagersByLocation(req,res){

        var city = req.params.city;
        var state = req.params.state;

        userModel
            .findAllManagersByLocation({"city" : city, "state" : state})
            .then(
                function (doc) {
                    var managers = doc;
                    res.json(managers);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req,res){
        var username = req.params.username;
        var password = req.params.password;

        userModel
            .findUserByCredentials(username,password)
            .then(
                function (doc) {
                    var user = doc;

                    req.user = user;

                    if (user.role == 'owner'){
                        req.session.currentOwner = user;
                    }
                   // console.log(user);
                    res.json(user);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
       // console.log(newUser);
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password)
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createManager(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);

                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req,res){
        var userId = req.params.id;
        var updatedUser = req.body;

        userModel
            .updateUser(userId,updatedUser)
            .then(
                function (doc) {
                    req.user = updatedUser;

                    if (updatedUser.role == 'owner'){
                        req.session.currentOwner = updatedUser;
                    }

                    res.json(doc);

                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateManager(req,res){
        var userId = req.params.id;
        var updatedUser = req.body;

        userModel
            .updateUser(userId,updatedUser)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){
        var userId = req.params.id;

        userModel
            .deleteUser(userId)
            .then(
                function (doc) {
                    users = doc;
                    res.json(users);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}