module.exports = function(app) {

    var forms = [
        {"_id": "000", "title": "Contacts", "userId": 123,
            "fields": [
                {"_id": "111", "label": "First Name", "type": "TEXT", "placeholder": "First Name"},
                {"_id": "222", "label": "Last Name", "type": "TEXT", "placeholder": "Last Name"},
                {"_id": "333", "label": "Address", "type": "TEXT", "placeholder": "Address"},
                {"_id": "444", "label": "State", "type": "OPTIONS", "options": [
                    {"label": "Massachussetts", "value": "MA"},
                    {"label": "New Hampshire", "value": "NH"}
                ]},
                {"_id": "555", "label": "ZIP", "type": "TEXT", "placeholder": "ZIP"},
                {"_id": "666", "label": "Email", "type": "EMAIL", "placeholder": "Email"}
            ]
        },
        {"_id": "010", "title": "ToDo", "userId": 234,
            "fields": [
                {"_id": "777", "label": "Title", "type": "TEXT", "placeholder": "Title"},
                {"_id": "888", "label": "Description", "type": "TEXTAREA", "placeholder": "Title"},
                {"_id": "999", "label": "Due Date", "type": "DATE"},
            ]
        }
    ];

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