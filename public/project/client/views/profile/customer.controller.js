(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerProfileController", CustomerProfileController);

    function CustomerProfileController(UserService,CustomerProfileService) {

        var vm = this;
        UserService
            .getCurrentUser()
            .then(function (res){
                vm.curCustomer = res.data;
            });
    }

})();