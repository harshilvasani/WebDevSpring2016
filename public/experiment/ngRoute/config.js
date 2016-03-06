/**
 * Created by Harshin on 19-Feb-16.
 */
(function(){
    angular
        .module("MovieApp")
        .config(configuration);

    function configuration($routeProvider){
     $routeProvider
         .when("/home",{
             templateUrl:"home.view.html"
         })
         .when("/search",{
             templateUrl:"search.view.html"
         })
         .otherwise({
             redirectTo:"home.view.html"
         })
    }
})();