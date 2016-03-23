var q = require("q");

module.exports = function(app) {

    var vehicles = require("./vehicle.mock.json");

    var api = {
        findAllVehicles : findAllVehicles,
        findAllVehicleByCompanyandBranch: findAllVehicleByCompanyandBranch,
        findVehicleByCompanyandBranchandType: findVehicleByCompanyandBranchandType,
        createVehicle: createVehicle,
        updateVehicle: updateVehicle,
        deleteVehicle: deleteVehicle
    }

    return api;

    function findAllVehicles(){
        var deferred = q.defer();
        deferred.resolve(vehicles);

        return deferred.promise;
    }

    function findAllVehicleByCompanyandBranch(company, branchId) {
        var myVehicles = [];
        for (var i in vehicles) {
            if (vehicles[i].company == company && vehicles[i].branchId == branchId) {
                myVehicles.push(vehicles[i]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(myVehicles);

        return deferred.promise;
    }

    function findVehicleByCompanyandBranchandType(company, branchId, type) {
        var vehicle = null;
        for (var i in vehicles) {
            if (vehicles[i].company == company && vehicles[i].branchId == branchId && vehicles[i].type == type) {
                vehicle = vehicles[i];
                break;
            }
        }
        var deferred = q.defer();
        deferred.resolve(vehicle);

        return deferred.promise;

    }

    function createVehicle(vehicle) {
        vehicle._id = (new Date).getTime();
        vehicles.push(vehicle);
        var deferred = q.defer();
        deferred.resolve(vehicles);

        return deferred.promise;
    }

    function deleteVehicle(vehicleId) {
        for (var i in vehicles) {
            if (vehicles[i]._id == vehicleId) {
                vehicles.splice(i, 1);
                break;
            }
        }
        var deferred = q.defer();
        deferred.resolve(vehicles);

        return deferred.promise;
    }

    function updateVehicle(vehicleId,vehicle) {
        for (var i in vehicles) {
            if (vehicles[i]._id == vehicleId) {
                vehicles[i] = vehicle;
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(vehicle);
        return deferred.promise;
    }
}