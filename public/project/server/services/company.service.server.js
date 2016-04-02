module.exports = function(app,companyModel) {

    app.get("/api/project/company", findAllCompanys);
    app.get("/api/project/company/:company", findCompany);
    app.post("/api/project/company", createCompany);
    app.put("/api/project/company/:id", updateCompany);
    app.delete("/api/project/company/:id", deleteCompany);

    app.post("/api/project/setCurCompany", setCurCompany);
    app.get("/api/project/getCurCompany", getCurCompany);

    function setCurCompany(req,res){
        var curCompany = req.body;
       // console.log(req.session.curCompany);
      //  console.log(req.session.currentUser);
        req.session.curCompany = curCompany;
        res.json(req.session.curCompany);

    }

    function getCurCompany(req,res){
        console.log(req.session.curCompany);
        res.json(req.session.curCompany);
    }

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

    function findCompany(req,res){

        var company = req.params.company;


        companyModel
            .findCompany(company)
            .then(
                function (doc) {
                    var company = doc;
                    res.json(company);
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