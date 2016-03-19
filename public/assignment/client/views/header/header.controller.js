(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService) {

        var vm = this;
        //Event Handler's declaration
        vm.checkRootScope=checkRootScope;
        vm.updateRootScope=updateRootScope;
        vm.isAdmin=isAdmin;

        //Event Handler's implementation
        function checkRootScope() {
            var curUser = UserService.getCurrentUser();

            if(curUser==null){
                return true;
            }
            else
            {
                vm.username = curUser.username;
                return false;
            }
        }

        function updateRootScope() {
            UserService.setCurrentUser(null);
        }

        function isAdmin(){
            var curUser = UserService.getCurrentUser();

            if(curUser!=null)
            {
                var roles=curUser.roles;
                if(roles!=null) {
                    for (var i in roles) {
                        if (roles[i] == "admin") {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }

})();