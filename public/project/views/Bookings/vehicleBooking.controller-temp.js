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
        $scope.details = details;

        $scope.origin = "boylston";
        $scope.destination = "brooklyne";
        $scope.abcd = "wswsxwe";
        var originArray;
        var destinationArray;

        //var URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOCATION&types=geocode&key=AIzaSyA3nKVMjeVHJbKe7D8M6U8SFlg4kTZU1bg&callback=JSON_CALLBACK";

        //$http.get(URL);

        var URL ="https://maps.googleapis.com/maps/api/geocode/json?address=PLACE&key=AIzaSyA3nKVMjeVHJbKe7D8M6U8SFlg4kTZU1bg";

       /* function search() {
            originArray = [];
            destinationArray = [];
            $scope.places = [];
            $scope.show = -1;

            var originSuggestions = function(predictions, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    alert(status);
                    return;
                }

                predictions.forEach(function(prediction) {
                    //console.log(prediction.description);

                    $http.get(URL.replace("PLACE",prediction.description))
                        .success(renderOrigin);
                });
            };

            var destinationSuggestions = function(predictions, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    alert(status);
                    return;
                }

                predictions.forEach(function(prediction) {
                   // console.log(prediction.description);
                    $http.get(URL.replace("PLACE",prediction.description))
                        .success(renderDestination);
                });
            };

            var service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions({ input: document.getElementById("origin").value}, originSuggestions);
            service.getQueryPredictions({ input: document.getElementById("destination").value}, destinationSuggestions);
        }
*/

        function search(){
            var inputOrigin = document.getElementById('origin').value;
            var inputDesitination = document.getElementById('destination').value;
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
        }

        function render(response){
            console.log(response);
        }

        function renderOrigin(response){
            if(originArray.indexOf(response.results[0].formatted_address)== -1 && response.status == "OK" ){
                originArray.push(response.results[0].formatted_address);
                console.log(response);
            }
        }

        function renderDestination(response){
            if(originArray.indexOf(response.results[0].formatted_address)== -1 && response.status == "OK" ){
                destinationArray.push(response.results[0].formatted_address);
            }

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
            getMap(index);
            getFare(index);
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

        function getFare(index){
            var service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix(
                {
                    origins: [$scope.places[index].origin],
                    destinations: [$scope.places[index].destination],
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
                    $scope.abcd = "w";
                    document.getElementById("fare").value =  response.rows[0].elements[0].distance.text;
                } else {
                    alert( "ERROR:" + status);
                }
            }
        }
    }
})();