var q = require("q");

module.exports = function(app) {

    var forms = require("./form.mock.json");

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        createFormForUser : createFormForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,

        findFormByTitle : findFormByTitle
    }

    return api;

    function findAllFormsForUser(userId) {
        var allForms = [];

        for(var i in forms){
            if(forms[i].userId == userId){
                allForms.push(forms[i]);
            }
        }
        var deferred = q.defer();
        deferred.resolve(allForms);

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

    function updateFormById(formId, newForm) {
        for(var i in forms){
            if(forms[i]._id == formId){
                forms[i].userId = newForm.userId;
                forms[i].title = newForm.title;
                forms[i].fields = newForm.fields;
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
};