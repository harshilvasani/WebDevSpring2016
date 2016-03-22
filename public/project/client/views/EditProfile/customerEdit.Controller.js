(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerEditProfileController", CustomerEditProfileController);

    function CustomerEditProfileController($scope,UserService, CustomerProfileService) {

        $scope.customer  = CustomerProfileService.getCurrentCustomer();

        var curUser = UserService.getCurrentUser();

        $scope.update = update;

        function update(updatedCustomer){
            CustomerProfileService.updateCustomer($scope.customer._id,$scope.customer,renderUpdateCustomer);
            var updatedUser = {"_id":curUser._id,
                                "username":$scope.customer.username,
                                "password":$scope.customer.password,
                                "role": curUser.role};

            UserService.updateUser(curUser._id,updatedUser, renderUpdateUser);
        }

        function renderUpdateCustomer(updatedCustomer){
            CustomerProfileService.setCurrentCustomer(updatedCustomer);
        }
        function renderUpdateUser(updatedUser){
            UserService.setCurrentUser(updatedUser);
        }
    }

})();