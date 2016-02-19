/**
 * Created by Harshin on 19-Feb-16.
 */
/**
 * Created by Harshin on 19-Feb-16.
 */
(function(){
    angular
        .module("MovieApp")
    .controller("NavController",NavController);

    function NavController($location,$scope){
        $scope.Mylocation=$location;
    }
})();