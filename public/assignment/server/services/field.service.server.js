module.exports = function(app,fieldModel) {

    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdForForm);

    function findAllFieldsForForm(req,res){
        var formId = req.params.formId;
        fieldModel
            .findAllFieldsForForm(formId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .findFieldByIdForForm(formId,fieldId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteFieldByIdForForm(formId,fieldId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFieldForForm(req,res){
        var formId = req.params.formId;
        var newField = req.body;

        fieldModel
            .createFieldForForm(formId,newField)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;

        fieldModel
            .updateFieldByIdForForm(formId,fieldId,updatedField)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}