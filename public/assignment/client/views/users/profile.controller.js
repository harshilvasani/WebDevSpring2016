(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {

        var vm = this;
        //Event Handler's declaration
        vm.update=update;

        var curUser = UserService.getCurrentUser();

        if(curUser == null){
            $location.path("/home");
        }

        else{
            vm.user = curUser;
        }

        //Event Handler's implementation
        function update(user){
            var curUser = UserService.getCurrentUser();

            var newUser={"_id":curUser._id,
                "firstName":user.firstName,
                "lastName":user.lastName,
                "username":user.username,
                "password":user.password,
                "roles": curUser.roles}

            UserService.updateUser(curUser._id,newUser);
            UserService.setCurrentUser(newUser);
        }
    }
})();