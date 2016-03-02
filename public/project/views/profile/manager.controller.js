(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("ManagerProfileController", ManagerProfileController);

    function ManagerProfileController($scope,UserService,ManagerProfileService) {

        var curUser = UserService.getCurrentUser();

        ManagerProfileService.findManagerByCredentials(curUser.username,curUser.password ,renderCurManager);

        function renderCurManager(curManager){
            $scope.curManager = curManager;
            ManagerProfileService.setCurrentManager(curManager);
        }
    }
})();