(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {

        var curUser = UserService.getCurrentUser();

        if(curUser == null){
            $location.path("/home");
        }

        else{
            $scope.username = curUser.username;
            $scope.password = curUser.password;
            $scope.firstName = curUser.firstName;
            $scope.lastName = curUser.lastName;
        }

        $scope.update=update;

        function update(username,password,firstName,lastName,email){


            var newUser={"_id":curUser._id,
                "firstName":firstName,
                "lastName":lastName,
                "username":username,
                "password":password,
                "roles": curUser.roles	}

            UserService.updateUser(curUser._id,newUser,render);

        }

        function render(user){
          //  curUser=user;
            UserService.setCurrentUser(user);
        }
    }
})();