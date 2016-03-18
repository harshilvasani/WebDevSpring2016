module.exports = function(app,userModel) {

    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user",findAllUsers);
    app.get("/api/assignment/user/:id",findUserById);
    app.put("/api/assignment/user/:id",updateUser);
    app.delete("/api/assignment/user/:id",deleteUser);

    function createUser(req,res){
        var newUser = req.body;
        var users = [];

        userModel
            .createUser(newUser)
            .then(
                function (doc) {
                    users = doc;
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req,res){
        var users = [];

        if(req.query.username == null && req.query.password==null) {
            userModel
                .findAllUsers()
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
        else if (req.query.username != null && req.query.password==null){
            findUserByUsername(req,res);
        }

        else{
            findUserByCredentials(req,res);
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

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;

        var user = null;

        userModel
            .findUserByCredentials(username,password)
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

    function updateUser(req,res){
        var userId = req.params.id;
        var updatedUser = req.body;

        userModel.updateUser(userId,updatedUser)
            .then(
                function (doc) {
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){
        var userId = req.params.id;

        userModel.deleteUser(userId)
            .then(
                function (doc) {
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}