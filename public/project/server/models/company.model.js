var q = require("q");

module.exports = function(app , db, mongoose) {

    var CompanySchema  = require("./company.schema.server.js")(mongoose);

    var companys = mongoose.model("companys", CompanySchema);

    var api = {
        findAllCompanys : findAllCompanys,
        findCompany : findCompany,
        createCompany : createCompany,
        updateCompany : updateCompany,
        deleteCompany : deleteCompany
    }

    return api;

    function findAllCompanys() {

        var companys = [];
        var deferred = q.defer();

        companys.find(function (err,results){
            if(!err){
                // console.log(results);
                companys = results;
                deferred.resolve(companys);
            }
        });

        return deferred.promise;
    }

    function findCompany(company){
        var company = null;
        var deferred = q.defer();

        companys.find({company : company},
            function (err,results){
            if(!err){
                // console.log(results);
                company = results;
                deferred.resolve(company[0]);
            }
        });

        return deferred.promise;
    }

    function createCompany(company) {

        var deferred = q.defer();

        companys.create(company,function (err,results){

            // console.log(results);
            if(!err) {
                console.log(results);
                deferred.resolve(results);
            }
            else {
                console.log(err);
                deferred.resolve(null);
            }});

        return deferred.promise;
    }

    function updateCompany(companyId, company) {
        var deferred = q.defer();

          companys.update(
            {_id : companyId},

            {$set: {"companyName": company.companyName,
                "companyAddr": company.companyAddr,
                "city": company.city,
                "state": company.state,
                "zipCode" : company.zipCode
            }},

            function (err,results){
                if(!err) {
                    deferred.resolve(results[0]);
                }
                else {
                    deferred.resolve(null);
                }
            });

        return deferred.promise;
    }

    function deleteCompany(companyId) {
        var deferred = q.defer();

        companys.remove({_id : companyId},function (err,results){
            if(!err) {
                deferred.resolve(results);
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }
}