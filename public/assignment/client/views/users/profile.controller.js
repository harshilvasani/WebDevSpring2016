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
                        console.log(res.data);
                        vm.user = res.data;
                        vm.user.email = res.data.email.join(",");
                    }
                );
        }
        init();

        //Event Handler's implementation
        function update(user){
            var emails = user.email.toString().split(",");

            var newUser={"_id":vm.user._id,
                "firstName":user.firstName,
                "lastName":user.lastName,
                "username":user.username,
                "password":user.password,
                "email" : emails,
                "roles": vm.user.roles}

            console.log(newUser);
            UserService
                .updateUser(vm.user._id,newUser)
                .then(function (res){
                    init();
                    /*UserService.setCurrentUser(newUser);
                    UserService
                        .getCurrentUser()
                        .then(
                            function (res){
                                console.log("in update user " + res.data);
                                vm.user = res.data;
                                vm.user.email = res.data.email.join(",");
                            }
                        );*/
                });

        }
    }
})();