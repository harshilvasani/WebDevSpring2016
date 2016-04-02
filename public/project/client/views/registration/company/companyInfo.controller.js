(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CompanyInfoRegistrationController", CompanyInfoRegistrationController);

    function CompanyInfoRegistrationController(CompanyService) {

        var vm = this;

        vm.saveCompany = saveCompany;

        function init(){
            var company = null;
            CompanyService.getCurrentCompany()
                .then(function(res){
                    company = res.data;
                    if(company != null && company != ""){
                        vm.company = company;
                    }
                    else {
                        var company = {	"_id":"",
                            "companyName" : "" , "companyAddr" : "",
                            "city":"",  "state":"",
                            "zipCode": ""};

                        CompanyService.setCurrentCompany(company)
                            .then(function(res){

                            });
                    }
                });
        }
        init();

        function saveCompany(newCompany){
            CompanyService.setCurrentCompany(newCompany)
                .then(function(res){

                });
        }
    }

})();