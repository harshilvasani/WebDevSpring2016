(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location) {

        $scope.login = login;

        function login(username,password){
             UserService.findUserByCredentials(username,password,render);
        }

        function render(user){
            if(user != null){
                //$rootScope = user;
                UserService.setCurrentUser(user);
                $location.path('/profile');
            }

            else {
                $scope.password = null;
                alert("Check your password OR username");
            }
        }
    }
})();