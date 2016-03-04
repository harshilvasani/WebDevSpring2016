(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("ManagerProfileController", ManagerProfileController);

    function ManagerProfileController($scope,VehicleService) {

        //Event Handler's declaration
        $scope.addVehicle = addVehicle;
        $scope.selectVehicle = selectVehicle;
        $scope.deleteVehicle = deleteVehicle;
        $scope.updateVehicle = updateVehicle;

        $scope.index = -1;

        var curManager = {"company" : "company-1", "branchId" : "B-01"}

        /*-----------vehicles event Handler's implementation-----------*/
        VehicleService.findAllVehicleByCompanyandBranch(curManager.company,curManager.branchId,renderBranchVehicles);

        function renderBranchVehicles(brachAllVehicle) {
            $scope.vehicles = brachAllVehicle;
        }

        function addVehicle(vehicle){
            if(vehicle.type != null) {
                var vehicle = {	"_id":(new Date).getTime(), "company":curManager.company,
                                "branchId":curManager.branchId,
                                "type":vehicle.type,"count":vehicle.count, "fare" : vehicle.fare}
                VehicleService.createVehicle(vehicle, renderAddVehicle);
            }
        }

        function renderAddVehicle(newVehicle){
            $scope.vehicles.push(newVehicle);
            $scope.vehicle = null;
        }

        function selectVehicle(index){
            $scope.index = index;
            var selectedVehicle = $scope.vehicles[index];
            $scope.vehicle = {"type":selectedVehicle.type,
                              "count":selectedVehicle.count,
                             "fare":selectedVehicle.fare}
        }

        function deleteVehicle(index){
            VehicleService.deleteVehicleById($scope.vehicles[index],renderDeleteVehicle);
        }

        function renderDeleteVehicle(allVehicles){
            VehicleService.findAllVehicleByCompanyandBranch(curManager.company,curManager.branchId,renderBranchVehicles);
        }

        function updateVehicle(formName){
            if($scope.index != -1 && $scope.vehicle.type != null)
            {
                var selectedVehicle = $scope.vehicles[$scope.index];
                selectedVehicle.type = $scope.vehicle.type;
                selectedVehicle.count = $scope.vehicle.count;
                selectedVehicle.fare = $scope.vehicle.fare;

                VehicleService.updateVehicleById(selectedVehicle,renderUpdateVehicle);
                $scope.index = -1;
                $scope.vehicle = null;
            }
        }

        function renderUpdateVehicle (newForm){
            VehicleService.findAllVehicleByCompanyandBranch(curManager.company,curManager.branchId,renderBranchVehicles);
        }
    }
})();