(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("OwnerInfoRegistrationController", OwnerInfoRegistrationController);

    function OwnerInfoRegistrationController(UserService) {

        var vm = this;

        vm.saveOwner = saveOwner;

        function init(){
            var owner = UserService.getCurrentOwner();
            if(owner != null){
                vm.owner = owner;
            }
            else{
               owner = {"_id":"",
                   "company":"",
                   "firstName":"","lastName":"",
                   "username":"","password":"",
                   "emailid":"", "contactnum":"",
                   "role": "owner"};
                UserService.setCurrentOwner(owner);
            }
        }
        init();

        function saveOwner(newOwner){
            UserService.setCurrentOwner(newOwner);
        }
    }

})();