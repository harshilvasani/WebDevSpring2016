module.exports = function(app, db, mongoose){
    var bookingModel = require("./models/booking.model.js")(app, db, mongoose);

    var bookingService = require("./services/booking.service.server.js")(app,bookingModel);
}