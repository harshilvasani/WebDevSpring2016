module.exports = function(app,branchModel) {

    app.get("/api/project/branch", findAllBranches);
    app.get("/api/project/Company/:company/branch", findAllBranchesByCompany);
    app.get("/api/project/Company/:company/branch/:branchId", findBranchByByCompanyandId);

    app.post("/api/project/branch", createBranch);
    app.put("/api/project/branch/:id", updateBranch);
    app.delete("/api/project/branch/:id", deleteBranch);

    app.get("/api/project/getCurBranches", getCurrentBranches);
    app.post("/api/project/setCurBranches", setCurrentBranches);

    function setCurrentBranches(req, res){
        var curBranches = req.body;
        req.session.curBranches = curBranches;
        res.json(req.session.curBranches);
    }

    function getCurrentBranches(req, res){
        res.json(req.session.curBranches);
    }

    function findAllBranches(req,res){
        branchModel
            .findAllBranches()
            .then(
                function (doc) {
                    branches = doc;
                    res.json(branches);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllBranchesByCompany(req,res){
        var company = req.params.company;

        branchModel
            .findAllBranchesByCompany(company)
            .then(
                function (doc) {
                    branches = doc;
                    res.json(branches);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findBranchByByCompanyandId(req,res){
        var company = req.params.company;
        var branchId = req.params.branchId;

        branchModel
            .findBranchByByCompanyandId(company,branchId)
            .then(
                function (doc) {
                    branch = doc;
                    res.json(branch);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createBranch(req,res){
        var newBranch = req.body;

        branchModel
            .createBranch(newBranch)
            .then(
                function (doc) {
                    newBranch = doc;
                    res.json(newBranch);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateBranch(req,res){
        var branchId = req.params.id;
        var updatedBranch = req.body;

        branchModel
            .updateBranch(branchId,updatedBranch)
            .then(
                function (doc) {
                    updatedBranch = doc;
                    res.json(updatedBranch);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteBranch(req,res){
        var branchId = req.params.id;

        branchModel
            .deleteBranch(branchId)
            .then(
                function (doc) {
                    branches = doc;
                    res.json(branches);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}