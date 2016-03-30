module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: {type: String},
        password: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        emails: {type: [String]},
        phones: {type: [String]}
    // store user documents in this collection
    }, {collection: 'user'});

    return UserSchema;
};