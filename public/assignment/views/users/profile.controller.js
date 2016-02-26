"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService,$location) {

        if($rootScope == null){
            $location.path("/home");
        }

        else{
            $scope.username = $rootScope.username;
            $scope.password = $rootScope.password;
            $scope.firstName = $rootScope.firstName;
            $scope.lastName = $rootScope.lastName;
        }

        $scope.update=update;

        function update(username,password,firstName,lastName,email){


            var newUser={"_id":$rootScope._id,
                "firstName":firstName,
                "lastName":lastName,
                "username":username,
                "password":password,
                "roles": $rootScope.roles	}

            UserService.updateUser($rootScope._id,newUser,render);

        }

        function render(user){
            $rootScope=user;
        }
    }
})();