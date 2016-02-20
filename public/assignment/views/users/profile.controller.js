(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService,$location) {
        $scope.update=update;

        var currentUser = $rootScope;

        $scope.username = currentUser.username;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;

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