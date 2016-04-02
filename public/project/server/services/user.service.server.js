module.exports = function(app,userModel) {

    app.post("/api/project/logout", logout);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/username/:username/password/:password", findUserByCredentials);
    app.get("/api/project/company/:company/manager", findAllManagersByCompany);
    app.get("/api/project/city/:city/state/:state/manager", findAllManagersByLocation);
    app.get("/api/project/company/:company/city/:city/state/:state/manager", findAllManagersByLocationandComapany);
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/loggedin", loggedin);

    app.get("/api/project/getCurOwner", getCurOwner);
    app.post("/api/project/setCurOwner", setCurOwner);

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req,res){

        if(req.session.currentUser != null){
            //console.log(req.session.currentUser);
            res.json(req.session.currentUser);
        }
        else
            res.json(null);

    }

    function getCurOwner(req,res){

        if(req.session.currentOwner != null){
            //console.log(req.session.currentUser);
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

                    req.session.currentUser = user;

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

    function createUser(req,res){
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function (doc) {
                    var NewUser = doc;

                    req.session.currentUser = newUser;

                    if (newUser.role == 'owner'){
                        req.session.currentOwner = newUser;
                    }
                    // console.log(newUser);
                    res.json(newUser);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req,res){
        var userId = req.params.id;
        var updatedUser = req.body;

        userModel
            .updateUser(userId,updatedUser)
            .then(
                function (doc) {
                    UpdateUser = doc;

                    req.session.currentUser = UpdateUser;

                    if (UpdateUser.role == 'owner'){
                        req.session.currentOwner = UpdateUser;
                    }

                    res.json(UpdateUser);

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