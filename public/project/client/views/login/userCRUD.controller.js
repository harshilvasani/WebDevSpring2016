(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("UserController", UserController);

    function UserController(UserService) {

        var vm = this;

        //Event Handler's declaration
        /*vm.addUser = addUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;*/

        vm.index = -1;

        /*-----------users event Handler's implementation-----------*/
        function init(){
            UserService.findAllUsers()
                .then(
                    function (response){
                        vm.users = response.data;
                    }
                );
        }

        init();

        /*function addUser(user){
            if(user != null)
                UserService
                    .createUser(user)
                    .then(
                        function (response){
                            vm.user = null;
                            init();
                        }
                    );
        }

        function selectUser(index){
            vm.index = index;
            var selectedUser = vm.users[index];
            vm.user = {"username" : selectedUser.username,
                "password": selectedUser.password,
                "role": selectedUser.role}
        }

        function deleteUser(index){
            UserService
                .deleteUser(vm.users[index]._id)
                .then(
                    function (response){
                        init();
                    }
                );
        }

        function updateUser(user){
            if(vm.index != -1)
            {
                user._id = vm.users[vm.index]._id;

                UserService
                    .updateUser(vm.users[vm.index]._id,user)
                    .then(
                        function (response){
                            vm.index = -1;
                            vm.user = null;
                            init();
                        }
                    );

            }
        }*/
    }
})();