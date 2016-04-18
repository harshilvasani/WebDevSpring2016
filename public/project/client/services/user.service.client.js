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
            createManager : createManager,
            updateManager : updateManager,

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
            var curOwner = $http.post("/api/project/setCurOwner",owner);
          //  console.log(curOwner);
            return curOwner;
        }

        function getCurrentOwner () {
            return $http.get("/api/project/getCurOwner");
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            var curUser = $http.get("/api/project/loggedin");
           // alert(curUser);
            return curUser;
        }

        function findUserByCredentials(username, password) {
            //return $http.get("/api/project/user/username/" + username + "/password/" + password);
            return $http.post("/api/project/login?username=" + username + "&password=" + password);
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

        function createManager(manager) {
            return $http.post("/api/project/manager", manager);
        }

        function updateManager(userId, user) {
            var updatedUser = $http.put("/api/project/manager/" + userId, user);
            return updatedUser;
        }

        function updateUser(userId, user) {
            var updatedUser = $http.put("/api/project/user/" + userId, user);
            console.log(updatedUser);
            return updatedUser;
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/user/" + userId);
        }
    }
})();