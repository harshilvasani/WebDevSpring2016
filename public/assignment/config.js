(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "../assignment/views/home/home.view.html"
               // controller
            })

            .when("/register", {
                templateUrl: "../assignment/views/users/register.view.html",
                controller: "RegisterController"
            })

            .when("/login", {
                templateUrl: "../assignment/views/users/login.view.html",
                controller : "LoginController"
            })

            .when("/profile", {
                templateUrl: "../assignment/views/users/profile.view.html",
                controller : "ProfileController"
            })

            .when("/admin", {
                templateUrl: "../assignment/views/admin/admin.view.html"
              //  controller
            })

            .when("/forms", {
                templateUrl: "../assignment/views/forms/forms.view.html",
                controller : "FormController"
            })

            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
                //  controller
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();