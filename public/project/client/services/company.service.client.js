(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("CompanyService",CompanyService);

    var companys = [];

    function CompanyService($http) {

        var api = {
            findAllCompanys : findAllCompanys,
            createCompany : createCompany,
            updateCompany : updateCompany,
            deleteCompany : deleteCompany
        }

        return api;

        function findAllCompanys() {
            return $http.get("/api/project/company");
        }

        function createCompany(company) {
            return $http.post("/api/project/company",company);
        }

        function updateCompany(companyId, company) {
            return $http.put("/api/project/company/" + companyId ,company);
        }

        function deleteCompany(companyId, callback) {
            return $http.delete("/api/project/company/" + companyId);
        }
    }
})();