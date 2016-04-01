(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("OwnerProfileController", OwnerProfileController);

    function OwnerProfileController(UserService,CompanyService,BranchService) {

        var vm = this;

        function init(){
            UserService
                .getCurrentUser()
                .then(function (res){
                    vm.curOwner = res.data;

                    console.log(vm.curOwner);
                    UserService.setCurrentOwner(vm.curOwner);

                    CompanyService
                        .findCompany(vm.curOwner.company)
                        .then(
                            function (response){
                                vm.curCompany = response.data;
                            }
                        );

                    BranchService
                        .findAllBranchesByCompany(vm.curOwner.company)
                        .then(
                            function (response){
                                vm.curBranches = response.data;
                            }
                        );

                });

          /*  VehicleService
                .findAllVehicleByCompanyandBranch(vm.curManager.company,vm.curManager.branchId)
                .then(
                    function (response){
                        vm.vehicles = response.data;
                    }
                );*/
        }

        init();

    }
})();