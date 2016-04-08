var q = require("q");

module.exports = function(app, db, mongoose) {

    var ActorSchema  = require("./user.schema.server.js")(mongoose);

    var actors = mongoose.model("actors", ActorSchema);

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
        var user=null;
        var deferred = q.defer();

        actors.find({$and: [{username : username},{password : password}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    user = results;
                    deferred.resolve(user[0]);
                }
            });

        return deferred.promise;
    }

    function findAllManagersByCompany(company) {
        var managers = [];
        var deferred = q.defer();

        actors.find({$and: [{company : company},{role : "manager"}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    managers = results;
                    deferred.resolve(managers);
                }
            });

        return deferred.promise;
    }

    function findAllManagersByLocation(location) {
        var managers = [];
        var deferred = q.defer();

        actors.find({$and: [{city : location.city},{state : location.state},{role : "manager"}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    managers = results;
                    deferred.resolve(managers);
                }
            });

        return deferred.promise;
    }

    function findAllManagersByLocationandComapany(location, company){
        var managers = [];
        var deferred = q.defer();

        actors.find({$and: [{city : location.city},{state : location.state},{company : company},{role : "manager"}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    managers = results;
                    deferred.resolve(managers);
                }
            });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        actors.find(function (err,results){
            if(!err) {
                // console.log(results);
                deferred.resolve(results);
            }
            else{
                deferred.resolve([]);
            }
        });

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        actors.create(user,function (err,results){

            //console.log(results);
            if(!err) {
                deferred.resolve(results);
            }
            else {
                deferred.resolve(null);
            }});

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        // console.log("in updateUser " + user.firstName);

        if(user.role == "customer"){
            actors.update(
                {_id : userId},

                {$set: {"password" : user.password,
                    "firstName" : user.firstName,
                    "lastName" : user.lastName,
                    "email" : user.email,
                    "address" : user.address,
                    "city" : user.city,
                    "state" : user.state,
                    "emailid" : user.emailid,
                    "contactnum" : user.contactnum,
                }},

                function (err,results){
                    if(!err) {
                        deferred.resolve(results[0]);
                    }
                    else {
                        deferred.resolve(null);
                    }
                });
        }

        else if(user.role == "manager"){
            actors.update(
                {_id : userId},

                {$set: {"password" : user.password,
                    "firstName" : user.firstName,
                    "lastName" : user.lastName,
                    "email" : user.email,
                    "address" : user.address,
                    "city" : user.city,
                    "state" : user.state,
                    "emailid" : user.emailid,
                    "contactnum" : user.contactnum,
                    "company" : user.company,
                    "branchId" : user.branchId,
                }},

                function (err,results){
                    if(!err) {
                        deferred.resolve(results[0]);
                    }
                    else {
                        deferred.resolve(null);
                    }
                });
        }

        if(user.role == "owner"){
            actors.update(
                {_id : userId},

                {$set: {"password" : user.password,
                    "firstName" : user.firstName,
                    "lastName" : user.lastName,
                    "email" : user.email,
                    "emailid" : user.emailid,
                    "contactnum" : user.contactnum,
                    "company" : user.company,
                }},

                function (err,results){
                    if(!err) {
                        deferred.resolve(results[0]);
                    }
                    else {
                        deferred.resolve(null);
                    }
                });
        }

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        actors.remove({_id : userId},function (err,results){
            if(!err) {
                deferred.resolve(results);
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }
}