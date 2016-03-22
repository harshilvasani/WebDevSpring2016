module.exports = function(app,bookingModel) {

    app.get("/api/project/Customer/:username/booking",findAllBookingsForCustomer);
    app.get("/api/project/Company/:company/booking",findAllBookingsForCompany);
    app.get("/api/project/Company/:company/Branch/:branchId/booking",findAllBookingsForBranch);
    app.get("/api/project/booking/:bookingId", findBookingById);

    app.get("/api/project/booking",findAllBookings);
    app.delete("/api/project/booking/:bookingId", deleteBookingById);
    app.post("/api/project/booking", createBookingForUser);
    app.put("/api/project/booking/:bookingId",updateBookingById);


    function findAllBookingsForCustomer(req,res){
        var bookings = [];
        var username = req.params.username;

        bookingModel
            .getAllBookingForCustomerByUsername(username)
            .then(
                function (doc) {
                    bookings = doc;
                    res.json(bookings);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllBookingsForCompany(req,res){
        var bookings = [];
        var company = req.params.company;

        bookingModel
            .getAllBookingForCompanyByName(company)
            .then(
                function (doc) {
                    bookings = doc;
                    res.json(bookings);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllBookingsForBranch(req,res){
        var bookings = [];
        var branchId = req.params.branchId;
        var company = req.params.company;

        bookingModel
            .getAllBookingForBranchByIdandCompany(branchId,company)
            .then(
                function (doc) {
                    bookings = doc;
                    res.json(bookings);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findBookingById(req,res){
        var booking = null;
        var bookingId = req.params.bookingId;

        bookingModel
            .findBookingById(bookingId)
            .then(
                function (doc) {
                    booking = doc;
                    res.json(booking);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllBookings(req,res){
        bookingModel
            .getAllBookings()
            .then(
                function (doc) {
                    booking = doc;
                    res.json(booking);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createBookingForUser(req,res){
        var newBooking = req.body;

        bookingModel
            .createBooking(newBooking)
            .then(
                function (doc) {
                    booking = doc;
                    res.json(booking);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateBookingById(req,res){
        var bookingId = req.params.bookingId;
        var updatedBooking = req.body;

        bookingModel
            .updateBookingById(bookingId,updatedBooking)
            .then(
                function (doc) {
                    booking = doc;
                    res.json(booking);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteBookingById(req,res){
        var bookingId = req.params.bookingId;

        bookingModel
            .deleteBookingById(bookingId)
            .then(
                function (doc) {
                    bookings = doc;
                    res.json(bookings);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}