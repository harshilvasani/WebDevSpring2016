(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location) {

        //Event Handler's declaration
        $scope.login = login;

        //Event Handler's implementation
        function login(username,password){
            UserService.findUserByCredentials(username,password,renderLogin);
        }

        function renderLogin(loggedUser){
            if(loggedUser != null){

                UserService.setCurrentUser(loggedUser);
                if(loggedUser.role == "customer"){
                    console.log(loggedUser);
                    $location.path('/customerProfile');
                }

                else if(loggedUser.role == "owner"){
                    $location.path('/ownerProfile');
                }

                else{
                    $location.path('/managerProfile');
                }


            }

            else {
                $scope.password = null;
                alert("Check your password OR username");
            }
        }


    }
})();