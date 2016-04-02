(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerRegistrationController", CustomerRegistrationController);

    function CustomerRegistrationController(UserService, CustomerProfileService, $location) {

        var vm = this;
        vm.create = create;

        function create(newCustomer){
            newCustomer._id = (new Date).getTime();
            newCustomer.role = "customer";
//            console.log(newCustomer);

            UserService.createUser(newCustomer)
                .then(function(res){
                  //  console.log(res.data);
                    UserService.setCurrentUser(res.data);
                    $location.path("/customerProfile");
                });

        }
    }

})();