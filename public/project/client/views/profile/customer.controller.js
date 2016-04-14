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
               // console.log(res.data);
                vm.curCustomer = res.data;

               // var img = document.getElementById('custImg');
                //img.src = 'data:image/*;base64,' + btoa(vm.curCustomer.img.data); //JS have btoa() function for it.
                //img.src = vm.curCustomer.img.data;
                //img.src = "images/user.png";
            });
    }

})();