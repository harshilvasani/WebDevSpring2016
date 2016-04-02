(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerProfileController", CustomerProfileController);

    function CustomerProfileController(UserService,CustomerProfileService) {

      //  alert("in Customer's profile");
        var vm = this;
        UserService
            .getCurrentUser()
            .then(function (res){
                console.log(res.data);
                vm.curCustomer = res.data;
            });
    }

})();