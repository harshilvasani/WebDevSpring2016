module.exports = function(mongoose) {

    var FieldSchema  = require("./field.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({

        userId: {type : String,
            description: "ID of user who created the form." +
            "Can be used to retrieve the user " +
            "instance given a form, or retrieve " +
            "all forms for a given user"},

        title: {type :String, default : "New Form"},

        fields: {type : [FieldSchema],
            description: "Array of embedded field instance objects " +
            "that adhere to the field schema described earlier",
        default: []},

        created : {type : Date,
            default: new Date()},

        updated : {type : Date, default: new Date()}

    }, {collection: 'form'});

    return FormSchema;
};