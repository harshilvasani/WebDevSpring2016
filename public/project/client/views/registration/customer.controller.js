(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerRegistrationController", CustomerRegistrationController);

    function CustomerRegistrationController($scope,UserService, CustomerProfileService, $location) {

        var vm = this;
        vm.create = create;


        function create(newCustomer){
            //  newCustomer._id = (new Date).getTime();
            newCustomer.role = "customer";

           // newCustomer.img = document.getElementById("pImg");
           // newCustomer.img.data = document.getElementById("pImg").src;
            //newCustomer.img.contentType = 'image/*';
//            console.log(newCustomer);

            UserService.createUser(newCustomer)
                .then(function(res){
                   // console.log(res.data);
                    UserService.setCurrentUser(res.data);
                    $location.path("/customerProfile");
                });

        }
    }

})();