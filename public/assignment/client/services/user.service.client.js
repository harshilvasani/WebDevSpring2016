(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http) {

        var api = {
            findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            findAllUsers : findAllUsers,
            createUser : createUser,
            register : register,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            updateUserByAdmin : updateUserByAdmin,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        }

        return api;

        function logout() {
            return $http.post("/api/assignment/logout");
        }


        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            // return $rootScope.currentUser;
            var curUser = $http.get("/api/assignment/loggedin");
            return curUser;
        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/assignment/login?username=" + credentials.username + "&password=" + credentials.password);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId,user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function updateUserByAdmin(userId,user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }
    }
})();