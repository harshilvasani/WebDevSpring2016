(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerEditProfileController", CustomerEditProfileController);

    function CustomerEditProfileController($location, UserService) {

        var vm = this;

        function init(){
            UserService
                .getCurrentUser()
                .then(function (res){
                    vm.customer = res.data;
                });
        }
        init();

        vm.update = update;

        function update(updatedCustomer){
            var updatedUser = updatedCustomer;
            updatedUser._id = vm.customer._id;
            updatedUser.role = vm.customer.role;

            UserService
                .updateUser(vm.customer._id,updatedUser);
            UserService.setCurrentUser(updatedUser);
                $location.path("/customerProfile");

        }

    }

})();