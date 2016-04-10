(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CompanyController", CompanyController);

    function CompanyController(CompanyService) {

        var vm = this;

        //Event Handler's declaration
        vm.addCompany = addCompany;
        vm.selectCompany = selectCompany;
        vm.deleteCompany = deleteCompany;
        vm.updateCompany = updateCompany;

        vm.index = -1;

        /*-----------users event Handler's implementation-----------*/
        function init(){
           // alert("in CompanyController");
            CompanyService
                .findAllCompanys()
                .then(
                    function (response){
                        vm.companys = response.data;
                    }
                );
        }

        init();

        function addCompany(company){
            if(company != null && vm.index==-1)
                CompanyService
                    .createCompany(company)
                    .then(
                        function (response){
                            vm.company = null;
                            init();
                        }
                    );
        }

        function selectCompany(index){
            vm.index = index;
            var selectedCompany = vm.companys[index];
            vm.company = {"companyName" : selectedCompany.companyName ,
                "companyAddr" : selectedCompany.companyAddr,
                "city":selectedCompany.city,
                "state":selectedCompany.state,
                "zipCode": selectedCompany.zipCode}
        }

        function deleteCompany(index){
            CompanyService
                .deleteCompany(vm.companys[index]._id)
                .then(
                    function (response){
                        init();
                    }
                );
        }

        function updateCompany(company){
            if(vm.index != -1)
            {
                company._id = vm.companys[vm.index]._id;
                CompanyService.updateCompany(vm.companys[vm.index]._id,company)
                    .then(
                        function (response){
                            vm.index = -1;
                            vm.company = null;
                            init();
                        }
                    );
            }
        }
    }
})();