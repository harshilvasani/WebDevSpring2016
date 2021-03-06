(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("OwnerProfileController", OwnerProfileController);

    function OwnerProfileController(UserService,CompanyService,BranchService) {

        var vm = this;

        function init(){
       //     alert("in owner's profile");

            UserService.getCurrentOwner()
                .then(function(res){

                    if (res.data != "" && res.data != null && res.data.company){
                        vm.curOwner = res.data;
                        console.log(res.data.company);
                        console.log(vm.curOwner);
                        getCompany();
                    }
                    else{
                        UserService
                            .getCurrentUser()
                            .then(function (res){
                                vm.curOwner = res.data;
                                console.log(vm.curOwner);

                                getCompany();



                                UserService.setCurrentOwner(vm.curOwner)
                                    .then(function(res){
                                       // alert("in Owner Controller setCurrentOwner");
                                    });

                            });
                    }

                })


            function getCompany(){
                CompanyService
                    .findCompany(vm.curOwner.company)
                    .then(
                        function (response){
                            vm.curCompany = response.data;
                            console.log(vm.curCompany);
                            CompanyService.setCurrentCompany(vm.curCompany)
                                .then(function(res){
                                    getBranches();
                                });

                        }
                    );
            }


            function getBranches(){
                //alert();
                BranchService
                    .findAllBranchesByCompany(vm.curOwner.company)
                    .then(
                        function (response){
                            //alert();
                            vm.curBranches = response.data;
                            //console.log(vm.curBranches);
                            BranchService.setCurrentBranches(vm.curBranches)
                                .then(function(res){

                                });
                        }
                    );
            }

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