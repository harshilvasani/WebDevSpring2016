(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("CompanyService",CompanyService);

    var companys = [];

    function CompanyService($rootScope) {
        var companys = [
            {	"_id":101,
                "companyName" : "comapny-1" , "companyAddr" : "70 saint alphonsus",
                "city":"Boston",  "state":"MA",
                "zipCode": "02120"},

            {	"_id":101,
                "companyName" : "comapny-2" , "companyAddr" : "75 saint alphonsus",
                "city":"Newton",  "state":"NY",
                "zipCode": "02121"},

            {	"_id":101,
                "companyName" : "comapny-3" , "companyAddr" : "80 saint alphonsus",
                "city":"WaterTown",  "state":"MA",
                "zipCode": "02122"}
        ]


        var api = {
            findAllCompanys : findAllCompanys,
            createCompany : createCompany,
            updateCompany : updateCompany,
            deleteCompany : deleteCompany
        }

        return api;

        function findAllCompanys(callback) {
            callback(companys);
        }

        function createCompany(company, callback) {
            companys.push(company);
            callback(company);
        }

        function updateCompany(companyId, company, callback) {
            for(var i in companys){
                if(companys[i]._id==companyId){
                    companys[i]=company;
                    callback(companys[i]);
                    break;
                }
            }
        }

        function deleteCompany(companyId, callback) {
            for(var i in companys){
                if(companys[i]._id==companyId){
                    companys.splice(i,1);
                    callback(companys);
                    break;
                }
            }
        }
    }
})();