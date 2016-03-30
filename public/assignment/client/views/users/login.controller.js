(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {

        var vm = this;

        //Event Handler's declaration
        vm.login = login;

        //Event Handler's implementation
        function login(user){
             UserService
                .findUserByCredentials({"username":user.username,"password":user.password})
                .then(
                    function (doc) {
                        if(doc.data != null){

                            UserService.setCurrentUser(doc.data);
                            $location.path('/profile');
                        }

                        else {
                            vm.password = null;
                            alert("Check your password OR username");
                        }
                    });
        }
    }
})();