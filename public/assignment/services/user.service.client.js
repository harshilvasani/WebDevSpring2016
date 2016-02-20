/**
 * Created by Harshin on 19-Feb-16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService() {
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ]


        var api = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        }

        return api;

        function findUserByUsernameAndPassword(username, password, callback) {
            var flag=false;
            for(var i in users){
                if(users[i].username==username && users[i].password==password){
                    callback(users[i]);
                    flag=true;
               }
            }

            if (flag==false){
                callback(null);
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            users.push(user);
            alert(user.username);
            callback(user);
        }

        function deleteUserById(userId, callback) {

        }

        function updateUser(userId, user, callback) {
            for(i in users){
                if(users[i]._id==userId){
                    users[i]=user;
                    callback(users[i]);
                }
            }
        }

    }
})();