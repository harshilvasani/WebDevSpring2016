(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerRegistrationController", CustomerRegistrationController);

    function CustomerRegistrationController(UserService, CustomerProfileService) {

        var vm = this;
        vm.create = create;

        function create(newCustomer){
            newCustomer._id = (new Date).getTime();
            newCustomer.role = "customer";

            UserService.setCurrentUser(newCustomer);
            UserService
                .createUser(newCustomer);

        }
    }

})();