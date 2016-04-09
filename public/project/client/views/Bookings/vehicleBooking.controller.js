(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("VehicleBookingController", VehicleBookingController);

    function VehicleBookingController($scope,$http, $routeParams, VehicleService) {

        var vm = this;

        vm.autoComplete = autoComplete;
        vm.getMap = getMap;
        vm.addPlace = addPlace;
        vm.details = details;

        var originArray;
        var destinationArray;
        var maxCount = 0;
        vm.places = [];

        function init(){
            var vehicleId = $routeParams.vehicleId;
            VehicleService
                .findVehicleById(vehicleId)
                .then(function(res){
                    vm.booking = res.data;
                    maxCount = res.data.count;
                    vm.booking.count = 0;
                })
        }

        init();
        function addPlace(){
            var inputOrigin = document.getElementById('origin').value;
            var inputDesitination = document.getElementById('destination').value;

            $scope.origin = null;
            $scope.destination = null;

            if(inputOrigin!="" && inputDesitination!=""){
                var newPlace = {"origin" : inputOrigin, "destination" : inputDesitination};
                $scope.places.push(newPlace);
            }

        }

        function render(response){
            $scope.legs = response.routes[0].legs[0];
        }

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

        function details(index){
            $scope.show = 1;

            var inputOrigin = $scope.places[index].origin;
            var inputDesitination = $scope.places[index].destination;

            var URL="https://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";

            var a=URL.replace("ORIGIN",inputOrigin);
            var b=a.replace("DESTINATION",inputDesitination);

            var req = {
                method: 'POST',
                url: "/maps",
                data: b,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }

            $http(req).success(render);

            getMap(index);
        }

        function getMap(index){

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            $scope.show = 1;

            var map = new google.maps.Map(document.getElementById('Mymap'), {
                zoom: 7,
            });

            directionsDisplay.setMap(map);

            directionsService.route({origin: $scope.places[index].origin,
                                     destination: $scope.places[index].destination,
                                     travelMode: google.maps.TravelMode.DRIVING},
                                        renderRouteMap);

            function renderRouteMap(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }

        }
    }
})();