var q = require("q");

module.exports = function(app) {

    var users = require("./user.mock.json");

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findAllUsersByRole : findAllUsersByRole,
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

        var deferred = q.defer();
        deferred.resolve(user);

        return deferred.promise;
    }

    function findAllUsersByRole(role) {
        var myUsers = [];
        for (var i in users) {
            if (users[i].role == role) {
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
        users.push(user);
        var deferred = q.defer();
        deferred.resolve(users);

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