(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location) {

        //Event Handler's declaration
        $scope.login = login;

        //Event Handler's implementation
        function login(username,password){
             UserService
                .findUserByCredentials(username,password)
                .then(
                    function (doc) {
                        if(doc.data != null){
                            UserService.setCurrentUser(doc.data);
                            $location.path('/profile');
                        }

                        else {
                            $scope.password = null;
                            alert("Check your password OR username");
                        }
                    });
        }
    }
})();