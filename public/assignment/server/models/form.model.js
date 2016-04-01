var q = require("q");

module.exports = function(app, db, mongoose) {

    var FormSchema  = require("./form.schema.server.js")(mongoose);

    var forms = mongoose.model("form", FormSchema);

    var fieldModel = require("./field.model.js")(app, db, forms);

    var fieldService = require("../services/field.service.server.js")(app,fieldModel);

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        createFormForUser : createFormForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findFormByTitle : findFormByTitle,
    }

    return api;

    function findAllFormsForUser(userId) {

        var deferred = q.defer();

        forms.find({userId : userId}, function (err,results){
            if(!err) {
                // console.log(results);
                deferred.resolve(results);
            }
            else{
                deferred.resolve([]);
            }
        });

        //deferred.reject(err);//if data is fetched for other server
        return deferred.promise;
    }

    function findFormById(formId){
        var deferred = q.defer();

        forms.find({_id : formId}, function (err,results){
            if(!err) {
                 //console.log(results[0]);
                deferred.resolve(results[0]);
            }
            else{
                deferred.resolve([]);
            }
        });

        //deferred.reject(err);//if data is fetched for other server
        return deferred.promise;
    }

    function createFormForUser(userId, form) {
       // form.userId = userId;

        forms.create(form);

        var deferred = q.defer();

        deferred.resolve(form);

        return deferred.promise;

    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        forms.remove({_id : formId}, function (err,results){
            if(!err) {
                //console.log(results[0]);
                deferred.resolve(true);
            }
            else{
                deferred.resolve(false);
            }
        });

        //deferred.reject(err);//if data is fetched for other server
        return deferred.promise;

    }

    function updateFormById(formId, updatedForm) {
        var deferred = q.defer();

        forms.update(
            {_id : formId},

            {$set: updatedForm},

            function (err,results){
                if(!err) {
                    deferred.resolve(updatedForm);
                }
                else {
                    deferred.resolve(null);
                }
            });

        return deferred.promise;
    }

    function findFormByTitle(formTitle){
        var deferred = q.defer();

        forms.find({title : formTitle}, function (err,results){
            if(!err) {
                //console.log(results[0]);
                deferred.resolve(results[0]);
            }
            else{
                deferred.resolve([]);
            }
        });

        //deferred.reject(err);//if data is fetched for other server
        return deferred.promise;
    }
};