module.exports = function(app,companyModel) {

    app.get("/api/project/company", findAllCompanys);
    app.post("/api/project/company", createCompany);
    app.put("/api/project/company/:id", updateCompany);
    app.delete("/api/project/company/:id", deleteCompany);


    function findAllCompanys(req,res){

        companyModel
            .findAllCompanys()
            .then(
                function (doc) {
                    var companys = doc;
                    res.json(companys);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createCompany(req,res){
        var newCompany = req.body;

        companyModel
            .createCompany(newCompany)
            .then(
                function (doc) {
                    newCompany = doc;
                    res.json(newCompany);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateCompany(req,res){
        var companyId = req.params.id;
        var updatedCompany = req.body;

        companyModel
            .updateCompany(companyId,updatedCompany)
            .then(
                function (doc) {
                    updatedCompany = doc;
                    res.json(updatedCompany);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCompany(req,res){
        var companyId = req.params.id;

        companyModel
            .deleteCompany(companyId)
            .then(
                function (doc) {
                    companys = doc;
                    res.json(companys);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}