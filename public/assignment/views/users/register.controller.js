(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService,$location) {
        $scope.register=register;

        function register(username,password,verifyPassword, email){

            if(password==verifyPassword){

                var newUser={"_id":(new Date).getTime(),
                            "firstName":null,
                            "lastName":null,
                            "username":username,
                            "password":password,
                            "roles": []	}
            }
            UserService.createUser(newUser,render);

        }

        function render(user){

            $rootScope=user;
            $location.path('/profile');
        }
    }
})();