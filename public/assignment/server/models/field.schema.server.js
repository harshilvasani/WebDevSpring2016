module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var FieldSchema = mongoose.Schema({
        label: {type: String},
        title: {type: String/text,
                enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder: {type: String},

        options: [
            [{
                label: {type: STRING},
                value: {type: STRING}
            }]
        ],
    });

    return FieldSchema;

};