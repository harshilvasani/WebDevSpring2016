(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService,$location) {

        var currentUser = $rootScope;

        if(currentUser == null){
            $location.path("/home");
        }

        else{
            $scope.username = currentUser.username;
            $scope.password = currentUser.password;
            $scope.firstName = currentUser.firstName;
            $scope.lastName = currentUser.lastName;
        }

        $scope.update=update;

        function update(username,password,firstName,lastName,email){


            var newUser={"_id":currentUser._id,
                "firstName":firstName,
                "lastName":lastName,
                "username":username,
                "password":password,
                "roles": currentUser.roles	}

            UserService.updateUser(currentUser._id,newUser,render);

        }

        function render(user){
            $rootScope=user;
        }
    }
})();