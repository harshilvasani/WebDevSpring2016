var q = require("q");

module.exports = function(app, db, mongoose) {

    var VehicleSchema  = require("./vehicle.schema.server.js")(mongoose);

    var vehicles = mongoose.model("vehicles", VehicleSchema);

    var api = {
        findAllVehicles : findAllVehicles,
        findVehicleById : findVehicleById,
        findAllVehicleByCompanyandBranch: findAllVehicleByCompanyandBranch,
        findVehicleByCompanyandBranchandType: findVehicleByCompanyandBranchandType,
        createVehicle: createVehicle,
        updateVehicle: updateVehicle,
        deleteVehicle: deleteVehicle
    }

    return api;

    function findAllVehicles(){

        var deferred = q.defer();

        vehicles.find(function (err,results){
                if(!err){
                   // console.log(results);
                    deferred.resolve(results);
                }
            });

        return deferred.promise;
    }

    function findVehicleById(Id) {
        var myVehicle = null;

        var deferred = q.defer();

        //console.log(Id);
        vehicles.find({_id : Id},
            function (err,results){
                if(!err){
                    //console.log(results[0]);
                    myVehicle = results[0];
                    deferred.resolve(myVehicle);
                }
            });

        return deferred.promise;
    }

    function findAllVehicleByCompanyandBranch(company, branchId) {
        var myVehicles = [];

        var deferred = q.defer();

        vehicles.find({$and: [{company : company},{branchId : branchId}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    myVehicles = results;
                    deferred.resolve(myVehicles);
                }
            });

        return deferred.promise;
    }

    function findVehicleByCompanyandBranchandType(company, branchId, type) {
        var myVehicles = [];

        var deferred = q.defer();


        vehicles.find({$and: [{company : company},{branchId : branchId}, {type : type}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    myVehicles = results;
                    deferred.resolve(myVehicles[0]);
                }
            });

        return deferred.promise;

    }

    function createVehicle(vehicle) {
        var deferred = q.defer();

        vehicles.create(vehicle,function (err,results){

           // console.log(results);
            if(!err) {
               // console.log(results);
                deferred.resolve(results);
            }
            else {
              //  console.log(err);
                deferred.resolve(null);
            }});

        return deferred.promise;
    }

    function deleteVehicle(vehicleId) {
        var deferred = q.defer();

        vehicles.remove({_id : vehicleId},function (err,results){
            if(!err) {
                deferred.resolve(results);
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function updateVehicle(vehicleId,vehicle) {
        var deferred = q.defer();

        // console.log("in updateUser " + user.firstName);

        vehicles.update(
            {_id : vehicleId},

            {$set: {"company": vehicle.company,
                "branchId": vehicle.branchId,
                "type": vehicle.type,
                "count": vehicle.count,
                "fare" : vehicle.fare
            }},

            function (err,results){
                if(!err) {
                    deferred.resolve(results[0]);
                }
                else {
                    deferred.resolve(null);
                }
            });

        return deferred.promise;
    }
}