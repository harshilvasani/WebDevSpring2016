module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var FieldSchema = mongoose.Schema({
        label: {type: String,
            description: "First Name"},

        title: {type: String/text,
            enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
            description: "TEXT"},

        placeholder: {type: String,
            description: "Alice"},

        options: {type : [{
            label: {type: String},
            value: {type: String}}],
            description : "[{label:'Male', value:'MALE'}, " +
            " {label:'Female', value:'FEMALE'}]"}
    });

    return FieldSchema;

};