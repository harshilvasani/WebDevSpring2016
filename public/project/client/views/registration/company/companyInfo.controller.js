(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CompanyInfoRegistrationController", CompanyInfoRegistrationController);

    function CompanyInfoRegistrationController(CompanyService) {

        var vm = this;

        vm.saveCompany = saveCompany;

        function init(){
            var company = CompanyService.getCurrentCompany();
            if(company != null){
                vm.company = company;
            }
            else {
                var company = {	"_id":"",
                    "companyName" : "" , "companyAddr" : "",
                    "city":"",  "state":"",
                    "zipCode": ""};

                CompanyService.setCurrentCompany(company);
            }
        }
        init();

        function saveCompany(newCompany){
            CompanyService.setCurrentCompany(newCompany);
        }
    }

})();