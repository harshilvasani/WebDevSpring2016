/**
 * Created by Harshin on 08-Apr-16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var BranchSchema = mongoose.Schema({

        firstName: {type: String,
            description : "Oliver"},

        lastName: {type: String,
            description : "Queen"},

        username: {type: String,
            description : "olie"},

        password: {type: String,
            description : "olie"},

        company: {type: String,
            description : "company-1"},

        branchId: {type: String,
            description : "B-01"},

        // store user documents in this collection
    }, {collection: 'branch'});

    return BranchSchema;
};