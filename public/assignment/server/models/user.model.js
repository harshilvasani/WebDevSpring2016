module.exports = function(app) {

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
        return users;
    }

    function createUser(user) {
        users.push(user);
    }

    function findUserById(userId) {
        for(var i in users) {
            if(users[i]._id==userId) {
                return users[i];
            }
        }
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
                break;
            }
        }
        return user;
    }

    function findUserByUsername(username) {
        var user=null;
        for(var i in users){
            if(users[i].username==username){
                user=users[i];
                break;
            }
        }
        return user;
    }
};