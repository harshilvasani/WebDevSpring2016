(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("OwnerInfoEditController", OwnerInfoEditController);

    function OwnerInfoEditController(UserService,CompanyService) {

        var vm = this;

        vm.saveOwner = saveOwner;

        function init(){
            var owner = UserService.getCurrentOwner();
            if(owner == null){
                var OWNER = UserService.getCurrentUser();

                vm.owner = {"_id":OWNER._id,
                    "company":OWNER.company,
                    "firstName":OWNER.firstName,"lastName":OWNER.lastName,
                    "username":OWNER.username,"password":OWNER.password,
                    "emailid": OWNER.emailid, "contactnum":OWNER.contactnum,
                    "role": "owner"};

                UserService.setCurrentOwner(vm.owner);
            }
            else{
                vm.owner = owner;
            }

            CompanyService
                .findCompany(vm.owner.company)
                .then(
                    function (response){
                        vm.company = response.data;
                        CompanyService.setCurrentCompany(vm.company);
                    }
                );
        }
        init();

        function saveOwner(newOwner){
            UserService.setCurrentOwner(newOwner);
        }
    }

})();