(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("VehicleBookingController", VehicleBookingController);

    function VehicleBookingController($scope, $http, $routeParams, VehicleService, BookingService, $location) {

        var vm = this;

        vm.autoComplete = autoComplete;
        vm.details = details;
        vm.confirmBooking = confirmBooking;
        vm.open1 = open1;

        var originArray;
        var destinationArray;
        vm.places = [];
        var fare = 0;
        var vehicle = null;

        function init(){


           /* var DATE = new Date("03-April-2017");

            vm.day = DATE;*/


            var vehicleId = $routeParams.vehicleId;
            VehicleService
                .findVehicleById(vehicleId)
                .then(function(res){

                    vehicle = res.data;
                    fare = res.data.fare;

                    vm.booking = {branchId : res.data.branchId,
                        company : res.data.company,
                        custUsername : $scope.currentUser.username,
                    type : res.data.type};

                    vm.maxCount = res.data.count;
                    vm.booking.count = 1;

                    vm.day = new Date();

                    vm.booking.time = new Date();
                    vm.hstep = 1;
                    vm.mstep = 1;
                    vm.ismeridian = true;
                })
        }

        init();

        function confirmBooking(){
            details();
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

        function details(){
            vm.show = 1;

            var inputOrigin = document.getElementById('origin').value;
            var inputDesitination = document.getElementById('destination').value;

            //console.log(inputOrigin + " " + inputDesitination);
            vm.booking.originAddr = inputOrigin;
            vm.booking.destAddr = inputDesitination;

            var URL="https://maps.googleapis.com/maps/api/directions/json?&origin=ORIGIN&destination=DESTINATION&key=AIzaSyD_70F4Mj8HaLj4AS8IYt4ZXyJGm2v-KD0";

            var a=URL.replace("ORIGIN",inputOrigin);
            var b=a.replace("DESTINATION",inputDesitination);

            var req = {
                method: 'POST',
                url: "/maps",
                data: b,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }

            if(inputOrigin!="" && inputDesitination!=""){
                $http(req).success(render);
            }
            else{
                alert("Enter origin and/or destination");
            }
        }

        function render(response){
            vm.legs = response.routes[0].legs[0];

            vm.fare = parseFloat(vm.legs.distance.text) * vm.booking.count * fare;
            vm.booking.charges = (vm.fare).toString();
            vm.booking.day = document.getElementById('day').value;


            BookingService
                .createBookingForCustomer(vm.booking)
                .then(function (res){
                    var bookingId = res.data._id;
                    console.log(res.data);

                    vehicle.count -= res.data.count;

                    VehicleService
                        .updateVehicle(vehicle._id,vehicle)
                        .then(function (res) {
                            console.log(res.data);

                            $location.path("/bookingDetails/" + bookingId);
                        });
                });


           // console.log(document.getElementById('day').value);
        }

        /*-------------------------Date Picker-----------------------------------*/

        vm.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        function open1 () {
            vm.popup1.opened = true;
        };


        vm.popup1 = {
            opened: false
        };
    /*--------------------timePicker-----------------------------------*/


        vm.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        vm.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            vm.booking.time = d;
        };


    }
})();