module.exports = function(mongoose) {

    var FieldSchema  = require("./fields.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({

        userId: {type : String},

        title: {type :String, default : "New Form"},

        fields: {type : [FieldSchema]},
        created : {type : data, defaut: new Date()},
        updated : {type : data, defaut: new Date()}

    }, {collection: 'form'});
    return FormSchema;
};