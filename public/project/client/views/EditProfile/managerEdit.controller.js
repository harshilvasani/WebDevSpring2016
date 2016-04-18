(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("ManagerEditProfileController", ManagerEditProfileController);

    function ManagerEditProfileController(UserService, BranchService, $location) {

        var vm = this;

        function init(){
            UserService
                .getCurrentUser()
                .then(function (res){
                    vm.manager = res.data;
                });
        }
        init();

        vm.update = update;

        function update(updatedManager){

            updatedManager.branchId = vm.manager.branchId
            updatedManager.company = vm.manager.company;
            updatedManager._id = vm.manager._id;
            updatedManager.role = vm.manager.role;

            UserService
                .updateUser(vm.manager._id,updatedManager)
                .then(function(res){
                    console.log(res.data);
                });


            UserService.setCurrentUser(updatedManager);

            BranchService
                .findBranchByByCompanyandId(updatedManager.company,updatedManager.branchId)
                .then(
                    function(response){
                        response.data.firstName = updatedManager.firstName;
                        response.data.lastName = updatedManager.lastName;
                        response.data.username = updatedManager.username;
                        response.data.password = updatedManager.password;

                        console.log(response.data);
                        BranchService
                            .updateBranch(response.data._id,response.data)
                            .then(function(res){
                                $location.path("/managerProfile");
                            });
                    }
                );

        }
    }

})();