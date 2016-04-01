(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            findAllManagersByCompany : findAllManagersByCompany,
            findAllManagersByLocation : findAllManagersByLocation,
            findAllManagersByLocationandComapany : findAllManagersByLocationandComapany,
            createUser : createUser,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            setCurrentOwner: setCurrentOwner,
            getCurrentOwner: getCurrentOwner,
            deleteUser : deleteUser,
            logout: logout
        }

        return api;

        function logout() {
            return $http.post("/api/project/logout");
        }

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
            var curUser = $http.get("/api/project/loggedin");
            return curUser;
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user/username/" + username + "/password/" + password);
        }

        function findAllManagersByCompany(company){
            return $http.get("/api/project/company/" + company + "/manager");
        }

        function findAllManagersByLocation(city,state){
            return $http.get("/api/project/city/" + city + "/state/" + state + "/manager");
        }

        function findAllManagersByLocationandComapany(city,state,company){
            return $http.get("/api/project/company/" + company + "/city/" + city + "/state/" + state + "/manager");
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