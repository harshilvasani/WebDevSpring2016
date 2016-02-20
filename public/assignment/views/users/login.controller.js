(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService,$location) {
        $scope.login=login;

        function login(username,password){

            UserService.findUserByUsernameAndPassword(username,password,render);

        }

        function render(user){
            if(user != null){
                $rootScope = user;
                $location.path('/profile');
            }

            else {
                $scope.password = null;
                alert("Check your password OR username");
            }


        }
    }
})();