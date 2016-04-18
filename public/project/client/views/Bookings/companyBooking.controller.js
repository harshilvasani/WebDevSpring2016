(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CompanyBookingController", CompanyBookingController);

    function CompanyBookingController(BookingService,UserService, $location, VehicleService) {

        var vm = this;

        //Event Handler's declaration
        vm.details = details
        vm.index = -1;
        var curUser = null;
        /*-----------bookings event Handler's implementation-----------*/

        function init(){

            var bookings = [];
            vm.bookings.length = [];
            UserService
                .getCurrentUser()
                .then(function(res){
                    curUser = res.data;

                    BookingService
                        .getAllBookingForCompany(curUser.company)
                        .then (
                            function (response){
                                bookings = response.data;
                                deleteOldBookings(bookings);
                            }
                        );
                });
        }

        init();

        function details(index){
            $location.path("/bookingDetails/" + vm.bookings[index]._id);
        }

        function deleteOldBookings(bookings){
            for(var i in bookings){

                var date = new Date(bookings[i].day).getTime();

                var curDate = (new Date((new Date).getDate()-1)).getTime();

                if(curDate > date){

                    var vehicle = null;

                    VehicleService
                        .findVehicleByCompany_Branch_Type(bookings[i].company, bookings[i].branchId, bookings[i].type )
                        .then(function (res){
                            vehicle = res.data;
                            console.log(vehicle);
                            console.log(vehicle.count);

                            vehicle.count += bookings[i].count;

                            console.log(vehicle.count);
                            VehicleService
                                .updateVehicle(vehicle._id, vehicle)
                                .then(function (res){

                                    BookingService
                                        .deleteBookingById(bookings[i]._id)
                                        .then(
                                            function (response){

                                            }
                                        );
                                })
                        })


                }
            }

            BookingService
                .getAllBookingForCompany(curUser.company)
                .then (
                    function (response){
                        vm.bookings = response.data;
                    }
                );
        }
    }
})();