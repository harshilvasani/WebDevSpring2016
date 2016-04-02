(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("OwnerInfoEditController", OwnerInfoEditController);

    function OwnerInfoEditController(UserService,CompanyService) {

        var vm = this;

        vm.saveOwner = saveOwner;

        function init(){
            var owner = null;

            UserService.getCurrentOwner()
                .then(function(res){
                    owner = res.data;
                    console.log(res);
                    if(owner == null || owner == ""){
                        var OWNER = null;
                        UserService
                            .getCurrentUser()
                            .then(function(res){
                                OWNER = res.data;

                                vm.owner = {"_id":OWNER._id,
                                    "company":OWNER.company,
                                    "firstName":OWNER.firstName,"lastName":OWNER.lastName,
                                    "username":OWNER.username,"password":OWNER.password,
                                    "emailid": OWNER.emailid, "contactnum":OWNER.contactnum,
                                    "role": "owner"};

                                UserService.setCurrentOwner(vm.owner)
                                    .then(function(res){
                                        getCurCompany();
                                    });
                            });
                    }
                    else{
                        vm.owner = owner;
                        getCurCompany();
                    }
                });
        }
        init();

        function getCurCompany(){
            CompanyService.getCurrentCompany()
                .then(function(res){
                    console.log(res);
                    if(res.data == ""){
                        //console.log(" shbhb "+ res);
                        CompanyService
                            .findCompany(vm.owner.company)
                            .then(
                                function (response){
                                    vm.company = response.data;
                                    CompanyService.setCurrentCompany(vm.company)
                                        .then(function(res){

                                        });
                                }
                            );
                    }
                    else{
                        vm.company = res.data;
                    }
                });
        }

        function saveOwner(newOwner){
            UserService.setCurrentOwner(newOwner)
                .then(function(res){

                });
        }
    }

})();