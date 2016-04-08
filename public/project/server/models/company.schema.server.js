/**
 * Created by Harshin on 08-Apr-16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var CompanySchema = mongoose.Schema({

        companyName: {type: String,
            description : "company-1"},

        companyAddr: {type: String,
            description : "70 saint alphonsus"},

        city: {type: String,
            description : "Boston"},

        state: {type: String,
            description : "MA"},

        zipCode: {type: String,
            description : "02120"},

        // store user documents in this collection
    }, {collection: 'company'});

    return CompanySchema;
};