(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("CompanyService",CompanyService);

    var companys = [];

    function CompanyService($http,$rootScope) {

        var api = {
            setCurrentCompany : setCurrentCompany,
            getCurrentCompany : getCurrentCompany,
            findAllCompanys : findAllCompanys,
            findCompany : findCompany,
            createCompany : createCompany,
            updateCompany : updateCompany,
            deleteCompany : deleteCompany,
        }

        return api;

        function setCurrentCompany(company){
           // $rootScope.company = company;
            //console.log(company);
            return $http.post("/api/project/setCurCompany",company);
        }

        function getCurrentCompany(){
           // return $rootScope.company;
            return $http.get("/api/project/getCurCompany");
        }

        function findAllCompanys() {
            return $http.get("/api/project/company");
        }

        function findCompany(company){
            return $http.get("/api/project/company/" + company);
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