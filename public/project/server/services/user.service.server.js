module.exports = function(app,userModel) {

    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/username/:username/password/:password", findUserByCredentials);
    app.get("/api/project/company/:company/manager", findAllManagersByCompany);

    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);


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

    function findUserByCredentials(req,res){
        var username = req.params.username;
        var password = req.params.password;

        userModel
            .findUserByCredentials(username,password)
            .then(
                function (doc) {
                    var user = doc;
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
                    newUser = doc;
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
                    updateUser = doc;
                    res.json(updateUser);
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