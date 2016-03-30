(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {

        var vm = this;
        //Event Handler's declaration
        vm.update=update;

       /* var curUser = UserService.getCurrentUser();

        if(curUser == null){
            $location.path("/home");
        }

        else{
            vm.user = curUser;
        }*/

        function init(){
            UserService
                .getCurrentUser()
                .then(
                    function (res){
                       // console.log(res.data);
                        vm.user = res.data;
                    }
                );
        }
        init();

        //Event Handler's implementation
        function update(user){

            var newUser={"_id":vm.user._id,
                "firstName":user.firstName,
                "lastName":user.lastName,
                "username":user.username,
                "password":user.password,
                "roles": vm.user.roles}

            UserService.updateUser(vm.user._id,newUser);
            UserService.setCurrentUser(newUser);
        }
    }
})();