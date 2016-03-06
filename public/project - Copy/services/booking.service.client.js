(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("BookingService",BookingService);

    var bookings = [];

    function BookingService($rootScope) {
        var bookings = [
                {"_id":101, "custUsername":"a","ContactName": "Bansal Shah",
                    "originAddr": "Huntington Ave", "destAddr" : "Roxbury Street",
                    "contactNum" : "617 792 2501", "day": "02/15/2016",
                    "time": "10:00 am", "charges": 100,
                    "company": "company-1", "branchId": "B-01",
                    "type": "Truck", "count": 2},

                {"_id":102,"custUsername":"b", "ContactName": "Harshil Vasani",
                    "originAddr": "Newton Ave", "destAddr" : "Huntington Street",
                    "contactNum" : "617 792 1851", "day": "03/15/2016",
                    "time": "9:00 am", "charges": 200,
                    "company": "company-2", "branchId": "B-01",
                    "type": "Bus", "count": 1},

                {"_id":103,"custUsername":"c", "ContactName": "Saloni Shah",
                    "originAddr": "Huntington Ave", "destAddr" : "Roxbury Street",
                    "contactNum" : "617 788 8854", "day": "04/15/2016",
                    "time": "10:00 am", "charges": 100,
                    "company": "company-1", "branchId": "B-02",
                    "type": "Truck", "count": 3}
            ]



        var api = {
            createBookingForCustomer : createBookingForCustomer,
            getAllBookings : getAllBookings,
            deleteBookingById : deleteBookingById,
            updateBookingById : updateBookingById
        }

        return api;

        function createBookingForCustomer(booking, callback) {
            booking._id = (new Date).getTime();
            booking.time = (new Date).getTime();
            booking.day = (new Date).getDate()
            bookings.push(booking);
            callback(booking);
        }

        function getAllBookings(callback) {
            callback(bookings);
        }


        function deleteBookingById(bookingId, callback) {
            for(var i in bookings){
                if(bookings[i]._id == bookingId){
                    bookings.splice(i,1);
                    break;
                }
            }
            callback(bookings);
        }

        function updateBookingById(bookingId, newBooking, callback) {
            for(var i in bookings){
                if(bookings[i]._id == bookingId){
                    bookings[i] = newBooking
                    callback(bookings[i]);
                    break;
                }
            }
        }
    }
})();