/**
 * Created by Harshin on 16-Feb-16.
 */

(function(){
    angular
        .module("WhiteBoardApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home.html"
                })

                .when("/profile", {
                    templateUrl: "profile.html"
                })

                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        })

        .controller("NavController", function($scope, $location){
            $scope.$locationVal = $location;
        });
})();