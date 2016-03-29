(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService,$location) {

        var vm = this;
        //Event Handler's declaration
        vm.logout=logout;

        //Event Handler's implementation

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });

        }
    }

})();