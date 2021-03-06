var q = require("q");

module.exports = function(app, db, forms) {

    /*var FormSchema  = require("./form.schema.server.js")(mongoose);

    var forms = mongoose.model("form", FormSchema);*/

    var api = {
        findAllFieldsForForm : findAllFieldsForForm,
        findFieldByIdForForm : findFieldByIdForForm,
        deleteFieldByIdForForm : deleteFieldByIdForForm,
        createFieldForForm : createFieldForForm,
        updateFieldByIdForForm : updateFieldByIdForForm
    }

    return api;

    function findAllFieldsForForm(formId){
        var deferred = q.defer();

        forms.find({_id : formId}, function (err,results){
            if(!err) {
                // console.log(results[0].fields);
                deferred.resolve(results[0].fields);
            }
            else{
                deferred.resolve([]);
            }
        });

        //deferred.reject(err);//if data is fetched for other server
        return deferred.promise;
    }

    function findFieldByIdForForm(formId,fieldId){
        var deferred = q.defer();
        var form = null;
        var fieldSelect = null;

        forms.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];
                for(var i in form.fields){
                    if(form.fields[i]._id==fieldId){
                        fieldSelect=form.fields[i];
                    }
                }

                deferred.resolve(fieldSelect);
            }
            else{
                deferred.resolve([]);
            }
        });

        return deferred.promise;
    }

    function deleteFieldByIdForForm(formId,fieldId){
        var deferred = q.defer();
        var form = null;

        forms.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];

                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields.splice(i,1);
                        break;
                    }
                }

                forms.update(
                    {_id : formId},

                    {$set: {"fields": form.fields}},

                    function (err,results){
                        if(!err) {
                            deferred.resolve(form);
                        }
                        else {
                            deferred.resolve(null);
                        }
                    });
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function createFieldForForm(formId,field){
        var deferred = q.defer();
        var form = null;

        // console.log(formId);
        forms.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];

                form.fields.push(field);

                /*  form.save();

                 console.log(form);
                 deferred.resolve(form);*/

                forms.update(
                    {_id : formId},

                    {$set: {"fields": form.fields}},

                    function (err,results){
                        if(!err) {
                            deferred.resolve(form);
                        }
                        else {
                            deferred.resolve(null);
                        }
                    });
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function updateFieldByIdForForm(formId,fieldId,field){
        var deferred = q.defer();
        var form = null;

        forms.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields[i] = field;
                        break;
                    }
                }

                forms.update(
                    {_id : formId},

                    {$set: {"fields": form.fields}},

                    function (err,results){
                        if(!err) {
                            deferred.resolve(form);
                        }
                        else {
                            deferred.resolve(null);
                        }
                    });
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }
};