(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("BookingDetailsController", BookingDetailsController);

    function BookingDetailsController($scope, $http, $routeParams, VehicleService, BookingService) {

        var vm = this;

        /*vm.getMap = getMap;
        vm.details = details;*/


        function init(){

            var bookingId = $routeParams.bookingId;
            BookingService
                .findBookingById(bookingId)
                .then(function(res){
                    vm.booking = res.data;
                    getMap(vm.booking.originAddr, vm.booking.destAddr);
                })
        }
        init();

        function getMap(inputOrigin, inputDesitination){

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            vm.show = 1;

            var map = new google.maps.Map(document.getElementById('Mymap'), {
                zoom: 7,
            });

            directionsDisplay.setMap(map);

            directionsService.route({origin: inputOrigin,
                    destination: inputDesitination,
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