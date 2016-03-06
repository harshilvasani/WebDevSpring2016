(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("VehicleBookingController", VehicleBookingController);

    function VehicleBookingController($scope,$http) {

        $scope.autoComplete = autoComplete;
        $scope.getMap = getMap;
        $scope.getFare = getFare;
        $scope.search = search;

        $scope.origin = "boylston";

        $scope.destination = "brooklyne";

        var originArray = [];
        var destinationArray = [];

        var URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOCATION&types=geocode&key=AIzaSyDS8Uah7fobBMR37jiluMCBz5-HGVLyAgs";

       /* $http.get(URL)
            .success(r);

        function r(response){
            console.log(response);
        }
*/
        if(google != null){
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
        }

        function search() {


            var inputOriginURL = URL.replace("LOCATION",$scope.origin);
            $http.get(inputOriginURL)
                .success(renderOrigin);

            var inputDestinationURL = URL.replace("LOCATION",$scope.destination);
            $http.get(inputDestinationURL)
                .success(renderDestination);

        }

        function renderOrigin(response){
            for(var i in response.predictions){
                originArray.push(response.predictions[i].description);
            }

        }

        function renderDestination(response){
            for(var i in response.predictions){
                destinationArray.push(response.predictions[i].description);
            }

/*            console.log(originArray);
            console.log(destinationArray);*/
            renderPlaces(originArray,destinationArray);
        }

        function renderPlaces(originArray,destinationArray){
            var places = [];

            for(var i in originArray){
                for(var j in destinationArray){
                    places.push({"origin" : originArray[i],
                                        "destination" : destinationArray[j]});
                }
            }
            $scope.places=places;
            //           console.log($scope.places);
        }

        function autoComplete() {
/*
            var inputOrigin = document.getElementById('origin');
            var inputDesitination = document.getElementById('destination');

            var localityOptions = {
                    types: ['address'], //['(cities)'], geocode to allow postal_code if you only want to allow cities then change this attribute
                    componentRestrictions: {country: 'us'}
                };

            var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin,localityOptions);
            var autocompleteDestination = new google.maps.places.Autocomplete(inputDesitination,localityOptions);
        */}

        function getMap(){
            $scope.show = 1;
            var origin = document.getElementById('origin').value;
            var destination = document.getElementById('destination').value;

            var map = new google.maps.Map(document.getElementById('Mymap'), {
                zoom: 7,
            });

            directionsDisplay.setMap(map);

            directionsService.route({origin: origin,
                                     destination: destination,
                                     travelMode: google.maps.TravelMode.DRIVING},
                                        renderRouteMap);

        }

        function renderRouteMap(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        }

        function getFare(origin,destination){

         /*   var origin = document.getElementById('origin').value;
            var destination = document.getElementById('destination').value;
*/
            var service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix(
                {
                    origins: origin,
                    destinations: destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                    avoidHighways: false,
                    avoidTolls: false
                },
                callback
            );

            function callback(response, status) {
                if(status=="OK") {
                    alert(response.rows[0].elements[0].distance.text);
                    alert(response.rows[0].elements[0].duration.text);
                } else {
                    alert( "ERROR:" + status);
                }
            }
        }
    }




})();