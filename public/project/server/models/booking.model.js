var q = require("q");

module.exports = function(app, db, mongoose) {

    var BookingSchema  = require("./booking.schema.server.js")(mongoose);

    var bookings = mongoose.model("bookings", BookingSchema);

    var api = {

        getAllBookings: getAllBookings,
        getAllBookingForCustomerByUsername : getAllBookingForCustomerByUsername,
        getAllBookingForCompanyByName : getAllBookingForCompanyByName,
        getAllBookingForBranchByIdandCompany : getAllBookingForBranchByIdandCompany,
        findBookingById : findBookingById,

        createBooking: createBooking,
        deleteBookingById: deleteBookingById,
        updateBookingById: updateBookingById
    }

    return api;

    function createBooking(booking) {
        booking._id = (new Date).getTime();
        booking.time = (new Date).getTime();
        booking.day = (new Date).getDate()
        bookings.push(booking);

        var deferred = q.defer();
        deferred.resolve(booking);

        return deferred.promise;
    }

    function getAllBookings() {
        var deferred = q.defer();
        deferred.resolve(bookings);

        return deferred.promise;
    }

    function getAllBookingForCustomerByUsername(username) {
        var myBookings = [];
        for (var i in bookings) {
            if (bookings[i].custUsername == username) {
                myBookings.push(bookings[i]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(myBookings);

        return deferred.promise;
    }

    function getAllBookingForCompanyByName(company){
        var myBookings = [];
        for (var i in bookings) {
            if (bookings[i].company == company) {
                myBookings.push(bookings[i]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(myBookings);

        return deferred.promise;
    }

    function getAllBookingForBranchByIdandCompany(branchId,company){
        var myBookings = [];
        for (var i in bookings) {
            if (bookings[i].branchId == branchId && bookings[i].company == company) {
                myBookings.push(bookings[i]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(myBookings);

        return deferred.promise;
    }

    function findBookingById(bookingId){

        var booking = null;

        for (var i in bookings) {
            if (bookings[i]._id == bookingId) {
                booking = bookings[i];
            }
        }

        var deferred = q.defer();
        deferred.resolve(booking);

        return deferred.promise;
    }

    function deleteBookingById(bookingId) {
        for (var i in bookings) {
            if (bookings[i]._id == bookingId) {
                bookings.splice(i, 1);
                break;
            }
        }
        var deferred = q.defer();
        deferred.resolve(bookings);

        return deferred.promise;
    }

    function updateBookingById(bookingId, updatedBooking) {
        for (var i in bookings) {
            if (bookings[i]._id == bookingId) {
                bookings[i] = updatedBooking
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(updatedBooking);

        return deferred.promise;
    }
}