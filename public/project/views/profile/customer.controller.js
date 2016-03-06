(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerProfileController", CustomerProfileController);

    function CustomerProfileController($scope,UserService,CustomerProfileService) {

        var curUser = UserService.getCurrentUser();

        CustomerProfileService.findCustomerByCredentials(curUser.username,curUser.password ,renderCurCustomer);

        function renderCurCustomer(curCustomer){
            $scope.curCustomer = curCustomer;
            CustomerProfileService.setCurrentCustomer(curCustomer);
        }
    }

})();