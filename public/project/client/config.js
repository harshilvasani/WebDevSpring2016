(function(){
    "use strict";

    angular
        .module("VehicleBookingApp")
        .config(Configure)
        .config(function($httpProvider){
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        });

    function Configure($routeProvider) {
        $routeProvider
            .when("/mainhome",{
                templateUrl: "views/home/mainHome.view.html",
                controller : "mainHomeController"
            })

            .when("/login",{
                templateUrl: "views/login/login.view.html",
                controller : "LoginController"
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
                templateUrl: "views/registration/customer.view.html",
                controller : "CustomerRegistrationController"
            })

            .when("/ownerProfile",{
                templateUrl: "views/profile/owner.view.html"
                // controller
            })

            .when("/managerProfile",{
                templateUrl: "views/profile/manager.view.html",
                controller: "ManagerProfileController"
            })

            .when("/customerProfile",{
                templateUrl: "views/profile/customer.view.html",
                controller: "CustomerProfileController"
            })

            .when("/managerEditProfile",{
                templateUrl: "views/EditProfile/managerEdit.view.html",
                controller : "ManagerEditProfileController"
            })

            .when("/customerEditProfile",{
                templateUrl: "views/EditProfile/customerEdit.view.html",
                controller : "CustomerEditProfileController"
            })

            .when("/ownerInfoEdit",{
                templateUrl: "views/EditProfile/company/ownerInfoEdit.view.html"
                // controller
            })

            .when("/companyInfoEdit",{
                templateUrl: "views/EditProfile/company/companyInfoEdit.view.html"
                // controller
            })

            .when("/branchInfoEdit",{
                templateUrl: "views/EditProfile/company/branchInfoEdit.view.html"
                // controller
            })

            .when("/branchBooking",{
                templateUrl: "views/Bookings/branchBooking.view.html"
                // controller
            })

            .when("/companyBooking",{
                templateUrl: "views/Bookings/companyBooking.view.html"
                // controller
            })

            .when("/customerBooking",{
                templateUrl: "views/Bookings/customerBooking.view.html",
                controller : "CustomerBookingController",
                controllerAs : "model"
            })

            .when("/bookingDtails",{
                templateUrl: "views/Bookings/details.view.html"
                // controller
            })
            .when("/vehicleBooking",{
                templateUrl: "views/Bookings/vehicleBooking.view.html",
                controller : "VehicleBookingController"
            })

            .when("/user",{
                templateUrl: "views/login/userCRUD.view.html",
                controller : "UserController"
            })

            .when("/branch",{
                templateUrl: "views/Branches/branches.view.html",
                controller : "BranchController"
            })

            .when("/company",{
                templateUrl: "views/Company/company.view.html",
                controller : "CompanyController"
            })

            .otherwise({
                redirectTo: "/mainhome"
            });
    }
})();