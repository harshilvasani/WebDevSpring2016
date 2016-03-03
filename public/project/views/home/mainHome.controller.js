(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("mainHomeController", mainHomeController);

    function mainHomeController($scope,ManagerProfileService,VehicleService) {

        $scope.autoComplete = autoComplete;
        $scope.search = search;
        $scope.book = book;

        function autoComplete() {

            var input_origin = document.getElementById('origin');/** @type {!HTMLInputElement} **/

            var localityOptions = {
                    types: ['(cities)'], //['(cities)'], geocode to allow postal_code if you only want to allow cities then change this attribute
                    componentRestrictions: {country: 'us'}
                };

            var autocompleteOrigin = new google.maps.places.Autocomplete(input_origin,localityOptions);

            $scope.origin=input_origin.value;
        }

        function search(){
            var input_origin = document.getElementById("origin").value;
            var addr = input_origin.split(", ");


            if(addr.length==3){
                $scope.searches = [];
                var city = addr[0];
                var state = addr [1];

                if($scope.company == null || $scope.company == "None"){
                    ManagerProfileService.findAllManagerByLocation(city,state,renderAllBrances);
                }

                else{
                    ManagerProfileService.findAllManagerByLocationandComapany(city,state,$scope.company,renderAllBrances);
                }
            }
        }

        function renderAllBrances(allBranches){

            if($scope.type == null || $scope.type == "None"){
                for(var i in allBranches){
                    VehicleService.findAllVehicleByCompanyandBranch(allBranches[i].company,allBranches[i].branchId,renderAllVehicles)
                }
            }

            else if($scope.type != null){
                for(var i in allBranches){
                    VehicleService.findVehicleByCompany_Branch_Type(allBranches[i].company,allBranches[i].branchId,
                                                                    $scope.type,renderAllVehicles)
                }
            }
        }

        function renderAllVehicles(vehicles){
            if(vehicles!=null)
            $scope.searches = $scope.searches.concat(vehicles);
        }


        function book(index){

        }


    }

})();