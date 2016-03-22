(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("ManagerEditProfileController", ManagerEditProfileController);

    function ManagerEditProfileController($scope,UserService, ManagerProfileService) {

        $scope.manager  = ManagerProfileService.getCurrentManager();

        var curUser = UserService.getCurrentUser();

        $scope.update = update;

        function update(updatedManager){
            ManagerProfileService.updateManager($scope.manager._id,$scope.manager,renderUpdateManager);
            var updatedUser = {"_id":curUser._id,
                "username":$scope.manager.username,
                "password":$scope.manager.password,
                "role": curUser.role};

            UserService.updateUser(curUser._id,updatedUser, renderUpdateUser);
        }

        function renderUpdateManager(manager){
            ManagerProfileService.setCurrentManager(manager);
        }
        function renderUpdateUser(updatedUser){
            UserService.setCurrentUser(updatedUser);
        }
    }

})();