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

            CompanyService.getCurrentCompany()
                .then(function(res){
                    console.log(res);
                    if(res.data == ""){
                        //console.log(" shbhb "+ res);
                        CompanyService
                            .findCompany(owner.company)
                            .then(
                                function (response){
                                    vm.company = response.data;
                                    CompanyService.setCurrentCompany(vm.company)
                                        .then(function(res){
                                            console.log(res.data);
                                        });
                                }
                            );
                    }
                    else{
                        vm.company = res.data;
                    }
                });

        }
        init();

        function saveCompany(newCompany){
           // console.log(newCompany);
            CompanyService.setCurrentCompany(newCompany)
                .then(function(res){
                    // console.log(res.data);
                });
        }
    }

})();