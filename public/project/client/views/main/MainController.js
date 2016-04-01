(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("MainController", MainController);

    function MainController($location,UserService) {
        var vm = this;

        vm.$location = $location;
        vm.checkUserForBooking = checkUserForBooking;
        vm.checkUserForVehicle = checkUserForVehicle;
        vm.checkUserForBranch = checkUserForBranch;

        function checkUserForBranch(){
            var loggedUser = UserService.getCurrentUser();

            if(loggedUser == null) {
                $location.path('/login');
                alert("login in as owner username = 'b', password = 'b'");
            }
            else if(loggedUser.role == "owner"){
                $location.path('/branch');
            }
            else{
                alert("login in as owner username = 'b', password = 'b'");
            }
        }

        function checkUserForVehicle(){
            var loggedUser = UserService.getCurrentUser();
            if(loggedUser == null) {
                $location.path('/login');
                alert("login in as manager username = 'dan', password = 'dan'");
            }
            else if(loggedUser.role == "manager"){
                $location.path('/managerProfile');
            }
            else{
                alert("login in as manager username = 'dan', password = 'dan'");
            }
        }

        function checkUserForBooking(){
            var loggedUser = UserService.getCurrentUser();
            if(loggedUser == null) {
                $location.path('/login');
            }
            else if(loggedUser.role == "customer"){
                $location.path('/customerBooking');
            }

            else if(loggedUser.role == "owner"){
                $location.path('/companyBooking');
            }

            else if(loggedUser.role == "manager"){
                $location.path('/branchBooking');
            }

        }
    }
})();