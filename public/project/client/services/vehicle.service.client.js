(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("VehicleService",VehicleService);

    function VehicleService($http) {

        var api = {
            findVehicleById : findVehicleById,
            findAllVehicleByCompanyandBranch : findAllVehicleByCompanyandBranch,
            findVehicleByCompany_Branch_Type : findVehicleByCompany_Branch_Type,
            findAllVehicles : findAllVehicles,
            createVehicle : createVehicle,
            updateVehicle : updateVehicle,
            deleteVehicle : deleteVehicle,
            deleteVehicleByCompany_Branch : deleteVehicleByCompany_Branch
        }

        return api;

        function findAllVehicles(){
           return $http.get("/api/project/vehicle");
        }

        function findVehicleById(Id){
            console.log(Id);
            return $http.get("/api/project/vehicle/" + Id);
        }

        function findAllVehicleByCompanyandBranch(company, branchId) {
           return $http.get("/api/project/company/" + company  +"/branch/" + branchId + "/vehicle");
        }

        function findVehicleByCompany_Branch_Type(company, branchId, type) {
            return $http.get("/api/project/company/" + company  +"/branch/" + branchId + "/vehicle/" + type);
        }

        function createVehicle(vehicle) {
            return $http.post("/api/project/vehicle", vehicle);
        }

        function deleteVehicle(vehicleId) {
            return $http.delete("/api/project/vehicle/" + vehicleId);
        }

        function deleteVehicleByCompany_Branch(company, branchId) {
            return $http.delete("/api/project/company/" + company  +"/branch/" + branchId);
        }

        function updateVehicle(vehicleId, vehicle) {
           return $http.put("/api/project/vehicle/" + vehicleId, vehicle);
        }
    }
})();