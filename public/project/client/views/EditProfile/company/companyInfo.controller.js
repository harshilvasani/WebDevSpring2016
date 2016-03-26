(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CompanyInfoEditController", CompanyInfoEditController);

    function CompanyInfoEditController(UserService, CompanyService) {

        var vm = this;

        vm.saveCompany = saveCompany;

        function init(){

            var owner = UserService.getCurrentOwner();
          //  console.log(owner);

            CompanyService
                .findCompany(owner.company)
                .then(
                    function (response){
                        vm.company = response.data;
                        CompanyService.setCurrentCompany(vm.company);
                    }
                );
        }
        init();

        function saveCompany(newCompany){
           // console.log(newCompany);
            CompanyService.setCurrentCompany(newCompany);
        }
    }

})();