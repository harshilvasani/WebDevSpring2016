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
        //updateBookingById: updateBookingById
    }

    return api;

    function createBooking(booking) {
        var deferred = q.defer();

        bookings.create(booking,function (err,results){

            // console.log(results);
            if(!err) {
               // console.log(results);
                deferred.resolve(results);
            }
            else {
               // console.log(err);
                deferred.resolve(null);
            }});

        return deferred.promise;
    }

    function getAllBookings() {
        var allBookings = [];
        var deferred = q.defer();

        bookings.find(function (err,results){
            if(!err){
                // console.log(results);
                allBookings = results;
                deferred.resolve(allBookings);
            }
        });

        return deferred.promise;
    }

    function getAllBookingForCustomerByUsername(username) {
        var myBookings = [];
        var deferred = q.defer();

        bookings.find({custUsername : username},
            function (err,results){
                if(!err){
                    // console.log(results);
                    myBookings = results;
                    deferred.resolve(myBookings);
                }
            });

        return deferred.promise;
    }

    function getAllBookingForCompanyByName(company){
        var myBookings = [];
        var deferred = q.defer();

        bookings.find({company : company},
            function (err,results){
                if(!err){
                    // console.log(results);
                    myBookings = results;
                    deferred.resolve(myBookings);
                }
            });

        return deferred.promise;
    }

    function getAllBookingForBranchByIdandCompany(branchId,company){
        var myBookings = [];
        var deferred = q.defer();

        bookings.find({$and: [{company : company},{branchId : branchId}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    myBookings = results;
                    deferred.resolve(myBookings);
                }
            });

        return deferred.promise;
    }

    function findBookingById(bookingId){

        var myBooking = null;
        var deferred = q.defer();

        bookings.find({_id : bookingId},
            function (err,results){
                if(!err){
                    // console.log(results);
                    myBooking = results;
                    deferred.resolve(myBooking[0]);
                }
            });

        return deferred.promise;
    }

    function deleteBookingById(bookingId) {
        var deferred = q.defer();

        bookings.remove({_id : bookingId},function (err,results){
            if(!err) {
                deferred.resolve(results);
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    /*function updateBookingById(bookingId, updatedBooking) {
        for (var i in bookings) {
            if (bookings[i]._id == bookingId) {
                bookings[i] = updatedBooking
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(updatedBooking);

        return deferred.promise;
    }*/
}