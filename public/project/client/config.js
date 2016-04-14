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
                templateUrl: "views/registration/company/ownerInfo.view.html",
            })

            .when("/companyInfo",{
                templateUrl: "views/registration/company/companyInfo.view.html",
            })

            .when("/branchInfo",{
                templateUrl: "views/registration/company/branchInfo.view.html",
            })

            .when("/customerRegistration",{
                templateUrl: "views/registration/customer.view.html",
                controller : "CustomerRegistrationController"
            })

            .when("/ownerProfile",{
                templateUrl: "views/profile/owner.view.html",
                resolve: {
                    checkOwnerLoggedIn : checkOwnerLoggedIn
                }
            })

            .when("/managerProfile",{
                templateUrl: "views/profile/manager.view.html",
                controller: "ManagerProfileController",
                resolve: {
                    checkManagerLoggedIn : checkManagerLoggedIn
                }
            })

            .when("/customerProfile",{
                templateUrl: "views/profile/customer.view.html",
                controller: "CustomerProfileController",
                resolve: {
                    checkCustomerLoggedIn : checkCustomerLoggedIn
                }
            })

            .when("/managerEditProfile",{
                templateUrl: "views/EditProfile/managerEdit.view.html",
                controller : "ManagerEditProfileController",
                resolve: {
                    checkManagerLoggedIn : checkManagerLoggedIn
                }
            })

            .when("/customerEditProfile",{
                templateUrl: "views/EditProfile/customerEdit.view.html",
                controller : "CustomerEditProfileController",
                resolve: {
                    checkCustomerLoggedIn : checkCustomerLoggedIn
                }
            })

            .when("/ownerInfoEdit",{
                templateUrl: "views/EditProfile/company/ownerInfoEdit.view.html",
                resolve: {
                    checkOwnerLoggedIn : checkOwnerLoggedIn
                }
            })

            .when("/companyInfoEdit",{
                templateUrl: "views/EditProfile/company/companyInfoEdit.view.html",
                resolve: {
                    checkOwnerLoggedIn : checkOwnerLoggedIn
                }
                // controller
            })

            .when("/branchInfoEdit",{
                templateUrl: "views/EditProfile/company/branchInfoEdit.view.html",
                resolve: {
                    checkOwnerLoggedIn : checkOwnerLoggedIn
                }
            })

            .when("/branchBooking",{
                templateUrl: "views/Bookings/branchBooking.view.html",
                controller : "BranchBookingController",
                controllerAs : "model",
                resolve: {
                    checkManagerLoggedIn : checkManagerLoggedIn
                }
            })

            .when("/companyBooking",{
                templateUrl: "views/Bookings/companyBooking.view.html",
                controller : "CompanyBookingController",
                controllerAs : "model",
                resolve: {
                    checkOwnerLoggedIn : checkOwnerLoggedIn
                }
            })

            .when("/customerBooking",{
                templateUrl: "views/Bookings/customerBooking.view.html",
                controller : "CustomerBookingController",
                controllerAs : "model",
                resolve: {
                    checkCustomerLoggedIn : checkCustomerLoggedIn
                }
            })

            .when("/bookingDetails/:bookingId",{
                templateUrl: "views/Bookings/bookingDetails.view.html",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                },
                controller : "BookingDetailsController"
            })
            .when("/vehicleBooking/:vehicleId",{
                templateUrl: "views/Bookings/vehicleBooking.view.html",
                controller : "VehicleBookingController",
                resolve: {
                    checkCustomerLoggedIn : checkCustomerLoggedIn
                }
            })

            .otherwise({
                redirectTo: "/mainhome"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        console.log("IN  Project's checkLoggedIn");
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                // console.log(currentUser);
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);

                    /*  if (currentUser.role == 'owner'){
                     UserService.setCurrentOwner(currentUser);
                     }*/
                    deferred.resolve();
                } else {
                    deferred.reject();
                    console.log("session not found");
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

    function checkOwnerLoggedIn(UserService, $q, $location) {
        console.log("IN  Project's checkOwnerLoggedIn");
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                 //console.log(currentUser);
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();

                    if(currentUser.role == 'customer'){
                        $location.url("/customerProfile");
                    }

                    if(currentUser.role == 'manager'){
                        $location.url("/managerProfile");
                    }
                } else {
                    deferred.reject();
                    console.log("session not found");
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

    function checkManagerLoggedIn(UserService, $q, $location) {
        console.log("IN  Project's checkManagerLoggedIn");
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                //console.log(currentUser);
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();

                    if(currentUser.role == 'customer'){
                        $location.url("/customerProfile");
                    }

                    if(currentUser.role == 'owner'){
                        $location.url("/ownerProfile");
                    }
                } else {
                    deferred.reject();
                    console.log("session not found");
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

    function checkCustomerLoggedIn(UserService, $q, $location) {
        console.log("IN  Project's checkCustomerLoggedIn");
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                //console.log(currentUser);
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();

                    if(currentUser.role == 'owner'){
                        $location.url("/ownerProfile");
                    }

                    if(currentUser.role == 'manager'){
                        $location.url("/managerProfile");
                    }
                } else {
                    deferred.reject();
                    console.log("session not found");
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();