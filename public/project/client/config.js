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
                // controller
            })

            .when("/companyInfo",{
                templateUrl: "views/registration/company/companyInfo.view.html",
                // controller
            })

            .when("/branchInfo",{
                templateUrl: "views/registration/company/branchInfo.view.html",
                // controller
            })

            .when("/customerRegistration",{
                templateUrl: "views/registration/customer.view.html",
                controller : "CustomerRegistrationController"
            })

            .when("/ownerProfile",{
                templateUrl: "views/profile/owner.view.html",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
                // controller
            })

            .when("/managerProfile",{
                templateUrl: "views/profile/manager.view.html",
                controller: "ManagerProfileController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/customerProfile",{
                templateUrl: "views/profile/customer.view.html",
                controller: "CustomerProfileController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/managerEditProfile",{
                templateUrl: "views/EditProfile/managerEdit.view.html",
                controller : "ManagerEditProfileController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/customerEditProfile",{
                templateUrl: "views/EditProfile/customerEdit.view.html",
                controller : "CustomerEditProfileController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/ownerInfoEdit",{
                templateUrl: "views/EditProfile/company/ownerInfoEdit.view.html",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
                // controller
            })

            .when("/companyInfoEdit",{
                templateUrl: "views/EditProfile/company/companyInfoEdit.view.html",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
                // controller
            })

            .when("/branchInfoEdit",{
                templateUrl: "views/EditProfile/company/branchInfoEdit.view.html",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
                // controller
            })

            .when("/branchBooking",{
                templateUrl: "views/Bookings/branchBooking.view.html",
                controller : "BranchBookingController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
                // controller
            })

            .when("/companyBooking",{
                templateUrl: "views/Bookings/companyBooking.view.html",
                controller : "CompanyBookingController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/customerBooking",{
                templateUrl: "views/Bookings/customerBooking.view.html",
                controller : "CustomerBookingController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
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
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/user",{
                templateUrl: "views/login/userCRUD.view.html",
                controller : "UserController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/branch",{
                templateUrl: "views/Branches/branches.view.html",
                controller : "BranchController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })

            .when("/company",{
                templateUrl: "views/Company/company.view.html",
                controller : "CompanyController"
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
})();