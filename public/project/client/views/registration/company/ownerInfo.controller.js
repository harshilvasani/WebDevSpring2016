(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("OwnerInfoRegistrationController", OwnerInfoRegistrationController);

    function OwnerInfoRegistrationController(UserService) {

        var vm = this;

        vm.saveOwner = saveOwner;

        function init(){
            var owner = null;
            UserService.getCurrentOwner()
                .then(function(res){
                    owner = res.data;

                   // console.log(owner);

                    if(owner != null && owner != ""){
                        vm.owner = owner;
                    }
                    else{
                        owner = {"_id":"",
                            "company":"",
                            "firstName":"","lastName":"",
                            "username":"","password":"",
                            "emailid":"", "contactnum":"",
                            "role": "owner"};

                        UserService.setCurrentOwner(owner)
                            .then(function(res){

                            });
                    }

                });

        }
        init();

        function saveOwner(newOwner){
            console.log(newOwner);
            UserService.setCurrentOwner(newOwner)
                .then(function(res){

                });
        }
    }

})();