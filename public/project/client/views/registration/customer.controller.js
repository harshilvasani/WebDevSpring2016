(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerRegistrationController", CustomerRegistrationController);

    function CustomerRegistrationController($scope,UserService, CustomerProfileService, $location) {

        var vm = this;
        vm.create = create;
        vm.img = "images/user.png"
        vm.imgagePath = imgagePath

        $scope.file_changed = function(element) {

            $scope.$apply(function(scope) {

                var tmppath = URL.createObjectURL(event.target.files[0]);
                //console.log(tmppath);
                vm.img = tmppath;

            });
        };

        function imgagePath(){
            console.log(document.getElementById("pImg").src)
        }

        function create(newCustomer){
            //  newCustomer._id = (new Date).getTime();
            newCustomer.role = "customer";

           // newCustomer.img = document.getElementById("pImg");
           // newCustomer.img.data = document.getElementById("pImg").src;
            //newCustomer.img.contentType = 'image/*';
//            console.log(newCustomer);

            UserService.createUser(newCustomer)
                .then(function(res){
                    console.log(res.data);
                    UserService.setCurrentUser(res.data);
                    $location.path("/customerProfile");
                });

        }
    }

})();