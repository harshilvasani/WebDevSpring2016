var q = require("q");

module.exports = function(app, db, mongoose) {

    var UserSchema  = require("./user.schema.server.js")(mongoose);

    var users = mongoose.model("users", UserSchema);

    var api = {
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        createUser : createUser,
        deleteUser : deleteUser,
        updateUser : updateUser,

        findUserByCredentials : findUserByCredentials,
        findUserByUsername : findUserByUsername
    }

    return api;

    function findAllUsers() {
        var deferred = q.defer();

        users.find(function (err,results){
           if(!err) {
              // console.log(results);
               deferred.resolve(results);
           }
            else{
               deferred.resolve([]);
           }
        });

        //deferred.reject(err);//if data is fetched for other server
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        var user = null

        users.find({_id : userId},function (err,results){
            if(!err) {
                user = results[0];
                //console.log(user);
                deferred.resolve(results[0]);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        users.create(user,function (err,results){


            if(!err) {
               // console.log(results);
                deferred.resolve(results);
            }
            else {
               // console.log(err);
                deferred.resolve(err);
            }});

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        users.remove({_id : userId},function (err,results){
            if(!err) {
                deferred.resolve(results);
            }
            else{
                deferred.resolve(err);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        users.update(
            {_id : userId},

            {$set: {"firstName" : user.firstName,
                "lastName" : user.lastName,
                "email" : user.email,
                "roles" : user.roles
            }},

            function (err,results){
            if(!err) {
                deferred.resolve(results);
            }
            else {
                deferred.resolve("error" + err);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var user=null;
        var deferred = q.defer();

        users.find({$and: [{username : credentials.username},{password : credentials.password}]},
            function (err,results){
                if(!err){
                   // console.log(results);
                    user = results;
                    deferred.resolve(user[0]);
                }
            });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        var user = null;

        users.find({username : username},function (err,results){
            if(!err) {
                user = results[0];
                deferred.resolve(results[0]);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
};