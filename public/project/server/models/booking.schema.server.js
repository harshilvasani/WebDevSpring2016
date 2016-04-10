/**
 * Created by Harshin on 08-Apr-16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var BookingSchema = mongoose.Schema({

        custUsername: {type: String,
            description : "Oliver"},

        ContactName: {type: String,
            description : "Queen"},

        originAddr: {type: String,
            description : "Huntington Ave"},

        destAddr: {type: String,
            description : "Roxbury Street"},

        contactNum: {type: String,
            description : "617 792 2501"},

        branchId: {type: String,
            description : "B-01"},

        day: {type: String,
            description : "02/15/2016"},

        time: {type: Date,
            description : "10:00 am"},

        charges: {type: String,
            description : "100"},

        company: {type: String,
            description : "company-1"},

        branchId: {type: String,
            description : "B-01"},

        type: {type: String,
            description : "truck"},

        count: {type: Number,
            description : 2},



        // store user documents in this collection
    }, {collection: 'booking'});

    return BookingSchema;
};