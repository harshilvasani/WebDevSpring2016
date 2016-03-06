/**
 * Created by Harshin on 14-Feb-16.
 */

(function() {
    angular
        .module("locationSearch", [])
        .controller("mapController", mapControllerFunc);

    function mapControllerFunc($scope,$http) {
        console.log("harshil Vasani...");

        var DIST_URL = "http://google.com/maps/api/distancematrix/json?origins=ORIGINS&destinations=DESTINATION";
        //Event Handlers
        $scope.calculateDistances = calculateDistances;


        //Event Handlers implemetation
        function calculateDistances(Map) {
            var origins = Map.source;
            var destination = Map.dest;

            alert(origins+" "+destination);

            var url = DIST_URL.replace("ORIGINS",origins);
            url = url.replace("DESTINATION",destination);

            alert(url);


            $http.get(url).success( function(response) {
                response.addHeader("Access-Control-Allow-Origin", "*");
                $scope.outputDiv = response;
                console.log(response);
            });
        }
    }
})();