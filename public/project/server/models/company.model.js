var q = require("q");

module.exports = function(app) {

    var companys = require("./company.mock.json");

    var api = {
        findAllCompanys : findAllCompanys,
        createCompany : createCompany,
        updateCompany : updateCompany,
        deleteCompany : deleteCompany
    }

    return api;

    function findAllCompanys() {

        var deferred = q.defer();
        deferred.resolve(companys);

        return deferred.promise;
    }

    function createCompany(company) {

        company._id = (new Date).getTime();
        companys.push(company);
        var deferred = q.defer();
        deferred.resolve(companys);

        return deferred.promise;
    }

    function updateCompany(companyId, company) {
        for(var i in companys){
            if(companys[i]._id==companyId){
                companys[i]=company;
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(company);

        return deferred.promise;
    }

    function deleteCompany(companyId, callback) {
        for(var i in companys){
            if(companys[i]._id==companyId){
                companys.splice(i,1);
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(companys);

        return deferred.promise;
    }
}