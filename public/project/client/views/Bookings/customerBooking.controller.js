(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerBookingController", CustomerBookingController);

    function CustomerBookingController(BookingService) {

        var vm = this;

        //Event Handler's declaration
        vm.addBooking = addBooking;
        vm.selectBooking = selectBooking;
        vm.deleteBooking = deleteBooking;
        vm.updateBooking = updateBooking;

        vm.index = -1;

        /*-----------bookings event Handler's implementation-----------*/

        function init(){
            BookingService
                .getAllBookings()
                .then (
                    function (response){
                        vm.bookings = response.data;
                    }
                );
        }

        init();

        function addBooking(booking){
            if(booking != null)
            BookingService
                .createBookingForCustomer(booking)
                .then(
                    function (response){
                        init();
                    }
                );
        }

        function selectBooking(index){
            vm.index = index;
            var selectedBooking = vm.bookings[index];
            vm.booking = {"custUsername" : selectedBooking.custUsername,
                            "company": selectedBooking.company,
                            "branchId": selectedBooking.branchId,
                            "ContactName" : selectedBooking.ContactName,
                            "originAddr" : selectedBooking.originAddr,
                            "destAddr" : selectedBooking.destAddr,
                            "type" : selectedBooking.type,
                            "count" : selectedBooking.count,
                            "charges" : selectedBooking.charges}
        }

        function deleteBooking(index){
            BookingService
                .deleteBookingById(vm.bookings[index]._id)
                .then(
                    function (response){
                        init();
                    }
                );
        }

        function updateBooking(booking){
            if(vm.index != -1)
            {
                BookingService
                    .updateBookingById(vm.bookings[vm.index]._id,booking)
                    .then(
                        function(response){
                            init();
                        }
                    );
                vm.index = -1;
                vm.booking = null;
            }
        }
    }
})();