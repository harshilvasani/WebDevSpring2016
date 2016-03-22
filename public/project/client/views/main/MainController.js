(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();