(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerBookingController", CustomerBookingController);

    function CustomerBookingController(BookingService,UserService, $location) {

        var vm = this;

        //Event Handler's declaration
        vm.details = details;
        var curUser = null;
        vm.index = -1;

        /*-----------bookings event Handler's implementation-----------*/

        function init(){

            var bookings = [];
            UserService
                .getCurrentUser()
                .then(function(res){
                    curUser = res.data;

                    BookingService
                        .getAllBookingForCustomerByUsername(curUser.username)
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
                var date = new Date(bookings[i].day);

                var curDate = (new Date).getTime();
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
                .getAllBookingForCustomerByUsername(curUser.username)
                .then (
                    function (response){
                        vm.bookings = response.data;
                    }
                );

        }
    }
})();