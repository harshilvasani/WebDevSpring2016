module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ActorSchema = mongoose.Schema({
        firstName: {type: String,
            description : "Alice"},

        lastName: {type: String,
            description : "Wonderland"},

        username: {type: String,
            description : "alice"},

        password: {type: String,
            description : "alice"},

        address: {type: String,
            description : "75 Saint alphonsus"},

        city: {type: String,
            description : "Boston"},

        state: {type: String,
            description : "MA"},

        emailid: {type: String,
            description : "alice@wonderland.com"},

        contactnum: {type: String,
            description : "120 345 6789"},

        role: {type: String,
            description : "customer"},

        company: {type: String,
            description : "company-1"},

        branchId: {type: String,
            description : "B-01"},

        // store user documents in this collection
    }, {collection: 'actor'});

    return ActorSchema;
};