(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("mainHomeController", mainHomeController);

    function mainHomeController(UserService,VehicleService,$location, CompanyService) {

        var vm = this;
        vm.autoComplete = autoComplete;
        vm.search = search;
        vm.book = book;
        vm.warn=0;

        function init(){
           // alert();

            CompanyService
                .findAllCompanys()
                .then(function(res){
                    vm.companys = res.data;
                })

            VehicleService
                .findAllVehicles()
                .then(function(res){
                    var V = [];
                    for(var i in res.data){
                        if(V.indexOf(res.data[i].type)< 0){
                            V.push(res.data[i].type);
                        }
                    }
                    vm.vehicles = V;
                })
        }
        init();
        function autoComplete() {

            var input_origin = document.getElementById('origin');/** @type {!HTMLInputElement} **/

            var localityOptions = {
                    types: ['(cities)'], //['(cities)'], geocode to allow postal_code if you only want to allow cities then change this attribute
                    componentRestrictions: {country: 'us'}
                };

            var autocompleteOrigin = new google.maps.places.Autocomplete(input_origin,localityOptions);

            vm.origin=input_origin.value;
        }

        function search(){
            var input_origin = document.getElementById("origin").value;
            var addr = input_origin.split(", ");


            if(addr.length==3){
                vm.searches = [];
                var city = addr[0];
                var state = addr [1];

                if(vm.company == null || vm.company == "None"){
                    UserService
                        .findAllManagersByLocation(city,state)//,renderAllBrances);
                        .then(
                            function(response){
                                //console.log(response.data);
                                renderAllBrances(response.data);
                            }
                        );
                }

                else{
                    UserService
                        .findAllManagersByLocationandComapany(city,state,vm.company)
                        .then(
                            function(response){
                                renderAllBrances(response.data);
                            }
                        );
                }
            }
            else{
                vm.warn=1;
            }
        }

        function renderAllBrances(allBranches){

            if(vm.type == null || vm.type == "None"){
                for(var i in allBranches){
                    VehicleService
                        .findAllVehicleByCompanyandBranch(allBranches[i].company,allBranches[i].branchId)
                        .then(
                            function(response){
                                renderAllVehicles(response.data);
                            }
                        );
                }
            }

            else if(vm.type != null){
                for(var i in allBranches){
                    VehicleService.findVehicleByCompany_Branch_Type(allBranches[i].company,allBranches[i].branchId, vm.type)
                        .then(
                            function(response){
                                renderAllVehicles(response.data);
                            }
                        );
                }
            }
        }

        function renderAllVehicles(vehicles){
            console.log(vehicles);

            if(vehicles!=null)
                vm.searches = vm.searches.concat(vehicles);

            for(var i in vm.searches){
                if(vm.searches[i].count == 0){
                    vm.searches.splice(i,1);
                }
            }
        }


        function book(index){
            UserService
                .getCurrentUser()
                .then(function(res){
                    if(res.data) {
                        console.log(vm.searches[index]);
                        $location.path("/vehicleBooking/" + vm.searches[index]._id);
                    }

                    else{
                        $location.path("/login");
                    }
                });

        }


    }

})();