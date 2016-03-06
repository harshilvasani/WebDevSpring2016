(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("VehicleBookingController", VehicleBookingController);

    function VehicleBookingController($scope) {

        $scope.autoComplete = autoComplete;
        $scope.getMap = getMap;
        $scope.getFare = getFare;

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        function autoComplete() {

            var inputOrigin = document.getElementById('origin');
            var inputDesitination = document.getElementById('destination');

            var localityOptions = {
                    types: ['address'], //['(cities)'], geocode to allow postal_code if you only want to allow cities then change this attribute
                    componentRestrictions: {country: 'us'}
                };

            var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin,localityOptions);
            var autocompleteDestination = new google.maps.places.Autocomplete(inputDesitination,localityOptions);

        }



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

        function getFare(){

            var origin = document.getElementById('origin').value;
            var destination = document.getElementById('destination').value;

            var service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                    avoidHighways: false,
                    avoidTolls: false
                },
                callback
            );

            function callback(response, status) {
                console.log (response);

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