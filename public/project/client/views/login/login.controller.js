(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {

        var vm = this;
        //Event Handler's declaration
        vm.login = login;

        //Event Handler's implementation
        function login(username,password){
           // alert(username + " " +password);
            UserService
                .findUserByCredentials(username,password)
                .then(
                    function(response){
                        var loggedUser = response.data;
                     //   console.log(loggedUser);
                        if(loggedUser != null){

                            UserService.setCurrentUser(loggedUser);

                           // console.log(loggedUser);
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

                        else {
                            vm.password = null;
                            alert("Check your password OR username");
                        }
                    }
                );
        }
    }
})();