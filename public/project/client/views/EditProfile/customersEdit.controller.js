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
                    console.log(res.data);
                    vm.customer = res.data;
                    console.log(vm.customer.state);
                });
        }
        init();

        vm.update = update;

        function update(updatedCustomer){
            var updatedUser = updatedCustomer;
            updatedUser._id = vm.customer._id;
            updatedUser.role = vm.customer.role;

            console.log(updatedUser);

            UserService
                .updateUser(vm.customer._id,updatedUser)
                .then(function(res){

                    UserService.setCurrentUser(updatedUser);
                    $location.path("/customerProfile");
                });



        }

    }

})();