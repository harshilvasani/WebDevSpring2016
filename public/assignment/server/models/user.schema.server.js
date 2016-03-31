module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: {type: String,
            description : "alice"},

        password: {type: String,
            description : "p@ssw0rd"},

        firstName: {type: String,
            description : "Alice"},

        lastName: {type: String,
            description : "Wonderland"},

        emails: {type: [String],
            description : "['alice@wonderland.com', " +
            "'alice@gmail.com']"},

        roles: {type: [String],
            description : "['faculty', 'admin']"}

        // store user documents in this collection
    }, {collection: 'user'});

    return UserSchema;
};