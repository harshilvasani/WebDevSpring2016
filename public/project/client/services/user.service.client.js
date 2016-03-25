(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            setCurrentOwner: setCurrentOwner,
            getCurrentOwner: getCurrentOwner,
            deleteUser : deleteUser
        }

        return api;


        function setCurrentOwner (owner) {
            $rootScope.currentOwner = owner;
        }

        function getCurrentOwner () {
            return $rootScope.currentOwner;
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user/username/" + username + "/password/" + password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/user/" + userId);
        }
    }
})();