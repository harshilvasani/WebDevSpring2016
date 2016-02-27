(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, UserService) {



        $scope.checkRootScope=checkRootScope;
        $scope.updateRootScope=updateRootScope;
        $scope.isAdmin=isAdmin;

        function checkRootScope() {
            var curUser = UserService.getCurrentUser();

            if(curUser==null){
                return true;
            }
            else
            {
                $scope.username=curUser.username;
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