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
        return allForms;
    }

    function findFormById(formId){
        for(var i in forms){
            if(forms[i]._id == formId){
                return forms[i];
            }
        }
    }

    function createFormForUser(userId, form) {
        form._id = (new Date).getTime();
        form.userId = userId;
        forms.push(form);
        return forms;
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
        for(var i in forms){
            if(forms[i].title == formTitle){
                return forms[i];
            }
        }
    }
};