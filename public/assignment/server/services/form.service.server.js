module.exports = function(app,formModel) {

    app.get("/api/assignment/user/:userId/form",findAllFormsForUser);
   // app.get("/api/assignment/form/:formId", findFormById);
   // app.delete("/api/assignment/form/:formId", deleteFormById);
   // app.post("/api/assignment/user/:userId/form", createFormForUser);
   // app.put("/api/assignment/form/:formId",updateFormById);

    function findAllFormsForUser(req,res){
        var forms = [];
        var userId = req.params.userId;

        formModel
            .findAllFormsForUser(userId)
            .then(
                function (doc) {
                    forms = doc;
                    res.json(forms);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }
}