(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope,UserService) {


        var vm = this;
        //Event Handler's declaration
        vm.Sort = Sort;
        vm.createUser = createUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;

        vm.index = -1;

        $scope.firstNameBottom = 0;
        $scope.lastNameBottom = 0;
        $scope.userNameBottom = 0;


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

        function Sort(prop,dir){

            if(prop == "username"){
                if(dir == 0){
                    $scope.userNameBottom = -1;
                    dir = 1;
                }
                else{
                    $scope.userNameBottom = -1 * dir;
                }
                $scope.lastNameBottom = 0;
                $scope.firstNameBottom = 0;

            }

            else if(prop == "firstName"){
                if(dir == 0){
                    $scope.firstNameBottom = -1;
                    dir = 1;
                }
                else{
                    $scope.firstNameBottom = -1 * dir;
                }
                $scope.lastNameBottom = 0;
                $scope.userNameBottom = 0;

            }

            else if(prop == "lastName"){
                if(dir == 0){
                    $scope.lastNameBottom = -1;
                    dir = 1;
                }
                else{
                    $scope.lastNameBottom = -1 * dir;
                }
                $scope.firstNameBottom = 0;
                $scope.userNameBottom = 0;

            }

            vm.users.sort( predicatBy(prop, dir));
        }

        function predicatBy(prop, dir){

            return function(a,b){
                if( a[prop] > b[prop]){
                    return dir;
                }else if( a[prop] < b[prop] ){
                    return -1*dir;
                }
                return 0;
            }
        }

//Usage



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
                        init();
                        vm.index = -1;
                        vm.user = null;

                    });


            }
        }
    }
})();