(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("BookingService",BookingService);

    var bookings = [];

    function BookingService($http) {

        var api = {
            createBookingForCustomer : createBookingForCustomer,
            getAllBookings : getAllBookings,
            deleteBookingById : deleteBookingById,
            updateBookingById : updateBookingById
        }

        return api;

        function createBookingForCustomer(booking) {
            booking._id = (new Date).getTime();
            booking.time = (new Date).getTime();
            booking.day = (new Date).getDate();

            return $http.post("/api/project/booking",booking);
        }

        function getAllBookings() {
            return $http.get("/api/project/booking");
        }

        function deleteBookingById(bookingId) {
            return $http.delete("/api/project/booking/"+bookingId);
        }

        function updateBookingById(bookingId, newBooking) {
            return $http.put("/api/project/booking/" + bookingId,newBooking);
        }
    }
})();