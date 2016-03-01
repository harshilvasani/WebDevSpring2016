(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("mainHomeController", mainHomeController);

    function mainHomeController($scope) {

        $scope.autoComplete = autoComplete;
        $scope.getLocation = getLocation;
        $scope.radioChange = radioChange;

        function radioChange(id){
            console.log(id);
        }

        function autoComplete() {

            var input_origin = document.getElementById('origin');/** @type {!HTMLInputElement} **/

            var localityOptions = {
                    types: ['(cities)'], //['(cities)'], geocode to allow postal_code if you only want to allow cities then change this attribute
                    componentRestrictions: {country: 'us'}
                };

            var autocompleteOrigin = new google.maps.places.Autocomplete(input_origin,localityOptions);

            $scope.origin=input_origin.value;
            var types = document.getElementById('type-selector');

            function setupClickListener(id, types) {
                var radioButton = document.getElementById(id);
                radioButton.addEventListener('click', function() {
                    autocompleteOrigin.setTypes(types);
                });
            }

            setupClickListener('changetype-all', []);
            setupClickListener('changetype-address', ['address']);
            setupClickListener('changetype-establishment', ['establishment']);
            setupClickListener('changetype-geocode', ['geocode']);
        }

        function getLocation(origin){
            var input_origin = document.getElementById("origin").value;
            alert(input_origin);
        }
    }




})();