module.exports = function(app,vehicleModel) {

    app.get("/api/project/vehicle", findAllVehicles);
    app.get("/api/project/company/:company/branch/:branchId/vehicle", findAllVehicleByCompanyandBranch);
    app.get("/api/project/company/:company/branch/:branchId/vehicle/:type", findVehicleByCompanyandBranchandType);

    app.post("/api/project/vehicle", createVehicle);
    app.put("/api/project/vehicle/:id", updateVehicle);
    app.delete("/api/project/vehicle/:id", deleteVehicle);


    function findAllVehicles(req,res){

        vehicleModel
            .findAllVehicles()
            .then(
                function (doc) {
                    var vehicles = doc;
                    res.json(vehicles);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllVehicleByCompanyandBranch(req,res){
        var company = req.params.company;
        var branchId = req.params.branchId;

        vehicleModel
            .findAllVehicleByCompanyandBranch(company,branchId)
            .then(
                function (doc) {
                    var vehicles = doc;
                    res.json(vehicles);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findVehicleByCompanyandBranchandType(req,res){
        var company = req.params.company;
        var branchId = req.params.branchId;
        var type = req.params.type;

        vehicleModel
            .findVehicleByCompanyandBranchandType(company,branchId,type)
            .then(
                function (doc) {
                    var vehicles = doc;
                    res.json(vehicles);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createVehicle(req,res){
        var newVehicle = req.body;

        vehicleModel
            .createVehicle(newVehicle)
            .then(
                function (doc) {
                    newVehicle = doc;
                    res.json(newVehicle);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateVehicle(req,res){
        var vehicleId = req.params.id;
        var updatedVehicle = req.body;

        vehicleModel
            .updateVehicle(vehicleId,updatedVehicle)
            .then(
                function (doc) {
                    updateVehicle = doc;
                    res.json(updateVehicle);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteVehicle(req,res){
        var vehicleId = req.params.id;

        vehicleModel
            .deleteVehicle(vehicleId)
            .then(
                function (doc) {
                    vehicles = doc;
                    res.json(vehicles);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}