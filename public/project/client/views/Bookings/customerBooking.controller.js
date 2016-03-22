(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerBookingController", CustomerBookingController);

    function CustomerBookingController($scope,BookingService) {

        //Event Handler's declaration
        $scope.addBooking = addBooking;
        $scope.selectBooking = selectBooking;
        $scope.deleteBooking = deleteBooking;
        $scope.updateBooking = updateBooking;

        $scope.index = -1;

        /*-----------bookings event Handler's implementation-----------*/
        BookingService.getAllBookings(renderAllBookings);

        function renderAllBookings(allBookings) {
            $scope.bookings = allBookings;
        }

        function addBooking(booking){
            if(booking != null)
            BookingService.createBookingForCustomer(booking, renderAddBooking);
        }

        function renderAddBooking(newBooking){
          //  console.log($scope.bookings);
           // $scope.bookings.push(newBooking);
            $scope.booking = null;
        }

        function selectBooking(index){
            $scope.index = index;
            var selectedBooking = $scope.bookings[index];
            $scope.booking = {"custUsername" : selectedBooking.custUsername,
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
            BookingService.deleteBookingById($scope.bookings[index]._id,renderDeleteBooking);
        }

        function renderDeleteBooking(allBooking){
          //  BookingService.getAllBookings(renderAllBookings);
        }

        function updateBooking(booking){
            if($scope.index != -1)
            {
                BookingService.updateBookingById($scope.bookings[$scope.index]._id,booking,renderUpdateBooking);
                $scope.index = -1;
                $scope.booking = null;
            }
        }

        function renderUpdateBooking (updatedBooking){
            //BookingService.getAllBookings(renderAllBookings);
        }
    }
})();