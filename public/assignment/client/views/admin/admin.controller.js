(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope,UserService) {


        var vm = this;
        //Event Handler's declaration
        vm.createUser = createUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;

        vm.index = -1;

        $scope.firstNameBottom = 1;
        $scope.lastNameBottom = 1;
        $scope.userNameBottom = 1;


        function init(){
            UserService
                .findAllUsers()
                .then(
                    function (res){
                        vm.users = res.data;
                    }
                );
        }
        init();

        //Event Handler's implementation
        function createUser(newUser){

                UserService
                    .createUser(newUser)
                    .then(
                        function (doc) {
                            vm.user = null;
                            init();
                        });
        }

        function selectUser(index){

            vm.index = index;

            vm.user = {"_id" : vm.users[index]._id,
                "firstName": vm.users[index].firstName,
                "lastName": vm.users[index].lastName,
                "username": vm.users[index].username,
                "password": "",
                "roles": vm.users[index].roles.join(",")};
        }

        function deleteUser(index){
            UserService
                .deleteUserById(vm.users[index]._id)
                .then(function(res){
                    init();
                });


        }

        function updateUser(user){

            if(vm.index != -1)
            {
                UserService
                    .updateUserByAdmin(user._id,user)
                    .then(function(res){
                        alert();
                        init();
                        vm.index = -1;
                        vm.user = null;

                    });


            }
        }
    }
})();