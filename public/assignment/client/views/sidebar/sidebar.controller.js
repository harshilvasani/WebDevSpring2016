(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(UserService) {

        var vm = this;
        //Event Handler's declaration
        vm.checkRootScope=checkRootScope;
        vm.isAdmin=isAdmin;

        UserService.setCurrentUser(null);

        //Event Handler's implementation
        function checkRootScope() {

            var curUser = UserService.getCurrentUser();

            if(curUser==null){
                return true;
            }
            else{
                return false;
            }
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
