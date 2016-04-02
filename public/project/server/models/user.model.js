var q = require("q");

module.exports = function(app) {

    var users = require("./user.mock.json");

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findAllManagersByCompany : findAllManagersByCompany,
        findAllManagersByLocation : findAllManagersByLocation,
        findAllManagersByLocationandComapany : findAllManagersByLocationandComapany,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    }

    return api;

    function findUserByCredentials(username, password) {
        var user = null;
        for (var i in users) {
            if (users[i].username == username && users[i].password == password) {
                user = users[i];
                break;
            }
        }
      //  console.log("in user model");
      //  console.log(user);

        var deferred = q.defer();
        deferred.resolve(user);

        return deferred.promise;
    }

    function findAllManagersByCompany(company) {
        var myUsers = [];
        for (var i in users) {
            if (users[i].company == company && users[i].role == "manager") {
                myUsers.push(users[i]);

            }
        }

        var deferred = q.defer();
        deferred.resolve(myUsers);

        return deferred.promise;
    }

    function findAllManagersByLocation(location) {
        var myUsers = [];
        for (var i in users) {
            if (users[i].city == location.city && users[i].state == location.state && users[i].role == "manager") {
                myUsers.push(users[i]);

            }
        }

        var deferred = q.defer();
        deferred.resolve(myUsers);

        return deferred.promise;
    }

    function findAllManagersByLocationandComapany(location, company){
        var myUsers = [];
        for (var i in users) {
            if (users[i].role == "manager" && users[i].city == location.city && users[i].state == location.state && users[i].company == company) {
                myUsers.push(users[i]);

            }
        }

        var deferred = q.defer();
        deferred.resolve(myUsers);

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        deferred.resolve(users);

        return deferred.promise;
    }

    function createUser(user) {
        user._id = (new Date).getTime();
        users.push(user);

        var deferred = q.defer();
        deferred.resolve(user);

        return deferred.promise;
    }

    function updateUser(userId, user) {
        for (var i in users) {
            if (users[i]._id == userId) {
                users[i] = user;
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(user);

        return deferred.promise;
    }

    function deleteUser(userId) {
        for (var i in users) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                break;
            }
        }
        var deferred = q.defer();
        deferred.resolve(users);

        return deferred.promise;
    }
}