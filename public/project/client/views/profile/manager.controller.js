(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("ManagerProfileController", ManagerProfileController);

    function ManagerProfileController(UserService,VehicleService) {

        var vm = this;

        //Event Handler's declaration
        vm.addVehicle = addVehicle;
        vm.selectVehicle = selectVehicle;
        vm.deleteVehicle = deleteVehicle;
        vm.updateVehicle = updateVehicle;

        vm.index = -1;

      //  var curManager = {"company" : "company-1", "branchId" : "B-01"}

        /*-----------vehicles event Handler's implementation-----------*/
    //    VehicleService.findAllVehicleByCompanyandBranch(curManager.company,curManager.branchId,renderBranchVehicles);

        function init(){
            vm.curManager = UserService.getCurrentUser();

            VehicleService
                .findAllVehicleByCompanyandBranch(vm.curManager.company,vm.curManager.branchId)
                .then(
                    function (response){
                        vm.vehicles = response.data;
                    }
                );
        }

        init();

        function addVehicle(vehicle){
            if(vehicle.type != null && vehicle.count>0 && vehicle.fare != null) {

                vehicle.company = vm.curManager.company;
                vehicle.branchId = vm.curManager.branchId;
                vehicle._id = (new Date).getTime();

                VehicleService
                    .createVehicle(vehicle)
                    .then(
                        function (response){
                            vm.vehicle = null;
                            init();
                        }
                    );
            }
        }

        function selectVehicle(index){
            vm.index = index;
            var selectedVehicle = vm.vehicles[index];
            vm.vehicle = {"type":selectedVehicle.type,
                              "count":selectedVehicle.count,
                             "fare":selectedVehicle.fare}
        }

        function deleteVehicle(index){
            VehicleService
                .deleteVehicle(vm.vehicles[index]._id)
                .then(
                    function (response){
                        init();
                    }
                );
        }

        function updateVehicle(vehicle){
            if(vm.index != -1)
            {
                vehicle._id = vm.vehicles[vm.index]._id;
                VehicleService
                    .updateVehicle(vm.vehicles[vm.index]._id,vehicle)
                    .then(
                        function (response){
                            vm.index = -1;
                            vm.vehicle = null;
                            init();
                        }
                    );
            }
        }
    }
})();