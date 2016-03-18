(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService,$location) {

        //Event Handler's declaration
        $scope.register=register;

        //Event Handler's implementation
        function register(username,password,verifyPassword, email){

            if(password==verifyPassword){

                var newUser={"_id":(new Date).getTime(),
                            "firstName":null,
                            "lastName":null,
                            "username":username,
                            "password":password,
                            "roles": []	}
            }
            UserService
                .createUser(newUser)
                .then(
                  function(doc){
                      UserService.setCurrentUser(newUser);
                      $location.path('/profile');
                  }
                );
        }
    }
})();