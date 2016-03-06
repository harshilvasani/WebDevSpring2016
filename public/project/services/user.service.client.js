(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("UserService",UserService);

    var users = [];

    function UserService($rootScope) {
        var users = [
            {	"_id":101,
                "username":"alice",  "password":"alice",
                "role": "customer"},
            {	"_id":102,
                "username":"a","password":"a",
                "role": "customer"},
            {	"_id":103,
                "username":"charlie","password":"charlie",
                "role": "owner"},
            {	"_id":104,
                "username":"dan",    "password":"dan",
                "role": "manager"},
            {	"_id":105,
                "username":"ed",     "password":"ed",
                "role": "manager"}
        ]


        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            deleteUser : deleteUser
        }

        return api;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password, callback) {
            var user=null;
            for(var i in users){
                if(users[i].username==username && users[i].password==password){
                    user=users[i];
                    break;
               }
            }

            callback(user);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            users.push(user);
            callback(user);
        }

        function updateUser(userId, user, callback) {
            for(var i in users){
                if(users[i]._id==userId){
                    users[i]=user;
                    callback(users[i]);
                    break;
                }
            }
        }
        function deleteUser(userId, callback) {
            for(var i in users){
                if(users[i]._id==userId){
                    users.splice(i,1);
                    callback(users);
                    break;
                }
            }
        }
    }
})();