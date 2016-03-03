(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("VehicleService",VehicleService);

    var vehicles = [];

    function VehicleService($rootScope) {
        var vehicles = [
            {	"_id":101, "company":"company-1", "branchId":"B-01",
                "type":"truck","count":5, "fare" : "5.00"},

            {	"_id":102, "company":"company-1", "branchId":"B-01",
                "type":"bus","count":12, "fare" : "8.00"},

            {	"_id":103, "company":"company-1", "branchId":"B-02",
                "type":"truck","count":7, "fare" : "3.00"},

            {	"_id":104, "company":"company-2", "branchId":"B-01",
                "type":"bus","count":11, "fare" : "6.50"},
        ]


        var api = {
            findAllVehicleByCompanyandBranch : findAllVehicleByCompanyandBranch,
            findVehicleByCompany_Branch_Type : findVehicleByCompany_Branch_Type,
            createVehicle : createVehicle,
            updateVehicleById : updateVehicleById,
            deleteVehicleById : deleteVehicleById
        }

        return api;



        function findAllVehicleByCompanyandBranch(company, branchId, callback) {
            var myVehicles = [];
            for(var i in vehicles){
                if(vehicles[i].company==company && vehicles[i].branchId==branchId){
                    myVehicles.push(vehicles[i]);
                }
            }
            callback(myVehicles);

        }

        function findVehicleByCompany_Branch_Type(company, branchId, type, callback) {
            var vehicle = null;
            for(var i in vehicles){
                if(vehicles[i].company==company && vehicles[i].branchId==branchId && vehicles[i].type==type){
                    vehicle = vehicles[i];
                    break;
                }
            }
            callback(vehicle);
        }

        function createVehicle(vehicle, callback) {
            vehicles.push(vehicle);
            callback(vehicle);
        }

        function deleteVehicleById(vehicle, callback) {
            for(var i in vehicles){
                if(vehicles[i]._id == vehicle._id){
                    vehicles.splice(i,1);
                    break;
                }
            }
            callback(vehicles);
        }

        function updateVehicleById(vehicle, callback) {
            for(var i in vehicles){
                if(vehicles[i]._id == vehicle._id){
                    vehicles[i]= vehicle;
                    callback(vehicles[i]);
                    break;
                }
            }
        }
    }
})();