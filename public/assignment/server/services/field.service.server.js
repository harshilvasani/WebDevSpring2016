module.exports = function(app,formModel) {

    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdForForm);

    function findAllFieldsForForm(req,res){

    }

    function findFieldByIdForForm(req,res){

    }

    function deleteFieldByIdForForm(req,res){

    }

    function createFieldForForm(req,res){

    }

    function updateFieldByIdForForm(req,res){

    }
}