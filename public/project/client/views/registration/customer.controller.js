(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerRegistrationController", CustomerRegistrationController);

    function CustomerRegistrationController($scope,UserService, CustomerProfileService) {



        var curUser = UserService.getCurrentUser();

        $scope.create = create;

        function create(newCustomer){
            newCustomer._id = (new Date).getTime();

            var newUser  = {"_id":newCustomer._id,
                            "username":newCustomer.username,
                            "password":newCustomer.password,
                            "role": "customer"};

            UserService.createUser(newUser,renderNewUser);
            CustomerProfileService.createCustomer(newCustomer,renderNewCustomer);
        }

        function renderNewUser(newUser){
            UserService.setCurrentUser(newUser);
        }

        function renderNewCustomer(newCustomer){
        }


    }

})();