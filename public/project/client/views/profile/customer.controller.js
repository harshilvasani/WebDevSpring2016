(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerProfileController", CustomerProfileController);

    function CustomerProfileController(UserService,CustomerProfileService) {

        var vm = this;
        vm.curCustomer = UserService.getCurrentUser();
    }

})();