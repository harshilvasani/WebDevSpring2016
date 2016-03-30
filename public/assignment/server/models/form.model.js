var q = require("q");

module.exports = function(app, db, mongoose) {

    var FormSchema  = require("./form.schema.server.js")(mongoose);

    var forms = mongoose.model("form", FormSchema);

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        createFormForUser : createFormForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findFormByTitle : findFormByTitle,

        //fields functions

        findAllFieldsForForm : findAllFieldsForForm,
        findFieldByIdForForm : findFieldByIdForForm,
        deleteFieldByIdForForm : deleteFieldByIdForForm,
        createFieldForForm : createFieldForForm,
        updateFieldByIdForForm : updateFieldByIdForForm
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
        var form = null;

        for(var i in forms){
            if(forms[i]._id == formId){
                form = forms[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(form);

        return deferred.promise;
    }

    function createFormForUser(userId, form) {
        form._id = (new Date).getTime();
        form.userId = userId;
        forms.push(form);

        var deferred = q.defer();
        deferred.resolve(forms);

        return deferred.promise;

    }

    function deleteFormById(formId) {
        for(var i in forms){
            if(forms[i]._id == formId){
                forms.splice(i,1);
                break;
            }
        }
    }

    function updateFormById(formId, updatedForm) {
        for(var i in forms){
            if(forms[i]._id == formId){
                forms[i].userId = updatedForm.userId;
                forms[i].title = updatedForm.title;
                forms[i].fields = updatedForm.fields;
                break;
            }
        }
    }

    function findFormByTitle(formTitle){
        var form = null;
        for(var i in forms){
            if(forms[i].title == formTitle){
                form = forms[i];
            }
        }
        var deferred = q.defer();
        deferred.resolve(form);

        return deferred.promise;
    }

    //fields function

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
        var form=null;

        for(var i in forms){
            if(forms[i]._id==formId) {
                form = forms[i];
                break;
            }
        }

        var fieldSelect=null;
        for(var i in form.fields){
            if(form.fields[i]._id==fieldId){
                fieldSelect=form.fields[i];
            }
        }

        deferred.resolve(fieldSelect);
        return deferred.promise;
    }

    function deleteFieldByIdForForm(formId,fieldId){
        var deferred = q.defer();
        var form = null;

        for(var i in forms){
            if(forms[i]._id == formId) {
                form = forms[i];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                form.fields.splice(i,1);
            }
        }

        deferred.resolve(form);
        return deferred.promise;
    }

    function createFieldForForm(formId,field){
        var deferred = q.defer();
        var form = null;

        for(var i in forms){
            if(forms[i]._id == formId) {
                form = forms[i];
                break;
            }
        }

        field._id=(new Date).getTime();

        form.fields.push(field);

        deferred.resolve(form);
        return deferred.promise;
    }

    function updateFieldByIdForForm(formId,fieldId,field){
        var deferred = q.defer();
        var form = null;

        for(var i in forms){
            if(forms[i]._id == formId) {
                form = forms[i];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                form.fields[i] = field;
                break;
            }
        }

        deferred.resolve(form);
        return deferred.promise
    }
};