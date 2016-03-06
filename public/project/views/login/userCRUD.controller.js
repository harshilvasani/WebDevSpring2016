(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("UserController", UserController);

    function UserController($scope, UserService) {
//Event Handler's declaration
        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;
        $scope.updateUser = updateUser;

        $scope.index = -1;

        /*-----------users event Handler's implementation-----------*/
        UserService.findAllUsers(renderAllUsers);

        function renderAllUsers(allUsers) {
            $scope.users = allUsers;
        }

        function addUser(user){
            if(user != null)
                UserService.createUser(user, renderAddUser);
        }

        function renderAddUser(newUser){
            //  console.log($scope.bookings);
            // $scope.bookings.push(newBooking);
            $scope.user = null;
        }

        function selectUser(index){
            $scope.index = index;
            var selectedUser = $scope.users[index];
            $scope.user = {"username" : selectedUser.username,
                "password": selectedUser.password,
                "role": selectedUser.role}
        }

        function deleteUser(index){
            UserService.deleteUser($scope.users[index]._id,renderDeleteUser);
        }

        function renderDeleteUser(allUser){
            //  BookingService.getAllBookings(renderAllBookings);
        }

        function updateUser(user){
            if($scope.index != -1)
            {
                UserService.updateUser($scope.users[$scope.index]._id,user,renderUpdateUser);
                $scope.index = -1;
                $scope.user = null;
            }
        }

        function renderUpdateUser (updatedUser){
            //BookingService.getAllBookings(renderAllBookings);
        }
    }
})();