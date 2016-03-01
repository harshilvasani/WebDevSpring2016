(function(){
    "use strict";

    angular
        .module("VehicleBookingApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/mainhome",{
                templateUrl: "views/home/mainHome.view.html"
                // controller
            })

            .when("/login",{
                templateUrl: "views/login/login.view.html"
                // controller
            })

            .when("/ownerInfo",{
                templateUrl: "views/registration/company/ownerInfo.view.html"
                // controller
            })

            .when("/companyInfo",{
                templateUrl: "views/registration/company/companyInfo.view.html"
                // controller
            })

            .when("/branchInfo",{
                templateUrl: "views/registration/company/branchInfo.view.html"
                // controller
            })

            .when("/customerRegistration",{
                templateUrl: "views/registration/customer.view.html"
                // controller
            })

            .when("/ownerProfile",{
                templateUrl: "views/profile/owner.view.html"
                // controller
            })

            .when("/managerProfile",{
                templateUrl: "views/profile/manager.view.html"
                // controller
            })

            .when("/customerProfile",{
                templateUrl: "views/profile/customer.view.html"
                // controller
            })


            .otherwise({
                redirectTo: "/mainhome"
            });
    }
})();