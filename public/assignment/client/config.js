(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
                // controller
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs : "model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                controllerAs : "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller : "ProfileController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })


            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
                //  controller
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller : "FormController",
                controllerAs : "model"
            })

            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller : "FieldController",
                controllerAs : "model"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        console.log("IN checkLoggedIn");
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                console.log("in config");
                console.log(currentUser);
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();