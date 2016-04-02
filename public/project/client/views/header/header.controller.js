(function(){

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {

        var vm = this;

        //Event Handler's declaration
        vm.logout=logout;
        vm.setProfile = setProfile;
        vm.displayBookings = displayBookings;

        //Event Handler's implementation
        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/mainhome");
                });

        }

        function setProfile(){
            var loggedUser = null;

                UserService.getCurrentUser()
                .then(function (res){
                    var loggedUser = res.data;
                    if(loggedUser.role == "customer"){
                        $location.path('/customerProfile');
                    }

                    else if(loggedUser.role == "owner"){
                        $location.path('/ownerProfile');
                    }

                    else if(loggedUser.role == "manager"){
                        $location.path('/managerProfile');
                    }
                });
        }

        function displayBookings(){
            var loggedUser = null;

            UserService.getCurrentUser()
                .then(function (res){
                    var loggedUser = res.data;

                    if(loggedUser.role == "customer"){
                        $location.path('/customerBooking');
                    }

                    else if(loggedUser.role == "owner"){
                        $location.path('/companyBooking');
                    }

                    else if(loggedUser.role == "manager"){
                        $location.path('/branchBooking');
                    }
                });
        }
    }
})();