module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var VehicleSchema = mongoose.Schema({

        company: {type: String,
            description : "company-1"},

        branchId: {type: String,
            description : "B-01"},

        type: {type: String,
            description : "truck"},

        count: {type: Number,
            description : "5"},

        fare: {type: String,
            description : "6.50"},

        // store user documents in this collection
    }, {collection: 'vehicle'});

    return VehicleSchema;
};