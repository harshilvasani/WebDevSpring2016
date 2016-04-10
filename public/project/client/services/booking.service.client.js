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
            updateBookingById : updateBookingById,
            getAllBookingForCustomerByUsername : getAllBookingForCustomerByUsername,
            getAllBookingForBranch : getAllBookingForBranch,
            getAllBookingForCompany : getAllBookingForCompany
        }

        return api;

        function createBookingForCustomer(booking) {
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

        function getAllBookingForCustomerByUsername(username){
            return $http.get("/api/project/Customer/" + username + "/booking");
        }

        function getAllBookingForBranch(company,branchId){
            return $http.get("/api/project/Company/" + company + "/Branch/" + branchId + "/booking");
        }

        function getAllBookingForCompany(company){
            return $http.get("/api/project/Company/" + company + "/booking");
        }
    }
})();