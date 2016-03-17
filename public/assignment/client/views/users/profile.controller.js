(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {

        //Event Handler's declaration
        $scope.update=update;

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

        //Event Handler's implementation
        function update(username,password,firstName,lastName,email){
            var curUser = UserService.getCurrentUser();

            var newUser={"_id":curUser._id,
                "firstName":firstName,
                "lastName":lastName,
                "username":username,
                "password":password,
                "roles": curUser.roles	}

            UserService.updateUser(curUser._id,newUser,render);

        }

        function render(user){
            UserService.setCurrentUser(user);
        }
    }
})();