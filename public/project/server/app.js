module.exports = function(app, db, mongoose){
    var bookingModel = require("./models/booking.model.js")(app, db, mongoose);
    var branchModel = require("./models/branch.model.js")(app, db, mongoose);
    var companyModel = require("./models/company.model.js")(app, db, mongoose);


    var bookingService = require("./services/booking.service.server.js")(app,bookingModel);
    var branchService = require("./services/branch.service.server.js")(app,branchModel);
    var companyService = require("./services/company.service.server.js")(app,companyModel);
}