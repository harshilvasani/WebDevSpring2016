module.exports = function(app,userModel,LocalStrategy) {

    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var auth = authorized;
    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin",               loggedin);
    app.post("/api/assignment/logout",                logout);
    app.get("/api/assignment/admin/user/:id",         findUserById);
    app.post("/api/assignment/register",              register);

    app.post("/api/assignment/admin/user",      auth, createUser);
    app.get("/api/assignment/admin/user",       auth, findAllUsers);
    app.put("/api/assignment/user/:id",         auth, updateUser);
    app.put("/api/assignment/admin/user/:id",   auth, updateUserAdmin);
    app.delete("/api/assignment/admin/user/:id",auth, deleteUser);

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

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    /*
     function loggedin(req,res){

     if(req.session.currentUser != null){
     //console.log(req.session.currentUser);
     res.json(req.session.currentUser);
     }
     else
     res.json(null);

     }
     */

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

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

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
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

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function findAllUsers(req,res){
        var users = [];

        if(req.query.username == null && req.query.password==null) {
            if(isAdmin(req.user)) {
                userModel
                    .findAllUsers()
                    .then(
                        function (doc) {
                            users = doc;
                            res.json(users);
                        },
                        function () {
                            res.status(400).send(err);
                        }
                    );
            } else {
                res.status(403);
            }
        }

        else if (req.query.username != null && req.query.password==null){
            findUserByUsername(req,res);
        }
    }

    function findUserById(req,res){
        var userId = req.params.id;
        var user = null;

        userModel.findUserById(userId)
            .then(
                function (doc) {
                    user = doc;
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req,res){
        var username = req.query.username;
        var user = null;

        // console.log(userId);
        userModel
            .findUserByUsername(username)
            .then(
                function (doc) {
                    user = doc;
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function localStrategy(username, password, done){
        /*        var username = req.query.username;
         var password = req.query.password;
         */
        var user = null;

        var credentials = {"username" : username,
            "password" : password};
        userModel
            .findUserByUsername(username)
            .then(
                function (doc) {
                    user = doc;
                    //req.session.currentUser = user;
                    console.log(user);
                    if(user )//&& bcrypt.compareSync(password,user.password))
                    {
                        console.log("localStrategy   ------------");
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

    function updateUserAdmin(req, res) {

        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        }
        else {
            newUser.roles = ["student"];
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }

    function updateUser(req, res) {

        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        /*if(!isAdmin(req.user)) {
         delete newUser.roles;
         }
         if(typeof newUser.roles == "string") {
         newUser.roles = newUser.roles.split(",");
         }*/

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(doc){
                    console.log(doc);
                    req.user = user;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .deleteUser(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
}