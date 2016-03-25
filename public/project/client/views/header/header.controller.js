(function(){

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {

        var vm = this;

        //Event Handler's declaration
        vm.checkRootScope=checkRootScope;
        vm.updateRootScope=updateRootScope;
        vm.setProfile = setProfile;
        vm.displayBookings = displayBookings;

        //Event Handler's implementation
        function checkRootScope() {
            var curUser = UserService.getCurrentUser();

            if(curUser==null){
                return true;
            }
            else
            {
                vm.username=curUser.username;
                return false;
            }
        }

        function updateRootScope() {
            UserService.setCurrentUser(null);
        }

        function setProfile(){
            var loggedUser = UserService.getCurrentUser();
            if(loggedUser.role == "customer"){
                $location.path('/customerProfile');
            }

            else if(loggedUser.role == "owner"){
                $location.path('/ownerProfile');
            }

            else{
                $location.path('/managerProfile');
            }
        }

        function displayBookings(){
            var loggedUser = UserService.getCurrentUser();
            if(loggedUser.role == "customer"){
                $location.path('/customerBooking');
            }

            else if(loggedUser.role == "owner"){
                $location.path('/companyBooking');
            }

            else{
                $location.path('/branchBooking');
            }
        }
    }
})();