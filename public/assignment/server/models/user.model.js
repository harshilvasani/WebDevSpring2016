var q = require("q");

module.exports = function(app) {

    var users = require("./user.mock.json");

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
        deferred.resolve(users);

        //deferred.reject(err);//if data is fetched for other server
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        var user = null

        for(var i in users) {
            if(users[i]._id==userId) {
                user = users[i];
                break;
            }
        }
        deferred.resolve(user);
        return deferred.promise;
    }

    function createUser(user) {
        users.push(user);
        var deferred = q.defer();
        deferred.resolve(users);

        return deferred.promise;
    }

    function deleteUser(userId) {
        for(var i in users){
            if(users[i]._id==userId){
                users.splice(i,1);
                break;
            }
        }
    }

    function updateUser(userId, user) {
        for(var i in users){
            if(users[i]._id==userId){
                users[i]=user;
                break;
            }
        }
    }

    function findUserByCredentials(username, password) {
        var user=null;
        for(var i in users){
            if(users[i].username==username && users[i].password==password){
                user=users[i];
                console.log(user);
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(user);

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var user=null;
        for(var i in users){
            if(users[i].username==username){
                user=users[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(user);

        return deferred.promise;
    }
};