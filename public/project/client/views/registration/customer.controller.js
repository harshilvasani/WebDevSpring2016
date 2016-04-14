(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CustomerRegistrationController", CustomerRegistrationController);

    function CustomerRegistrationController($scope,UserService, CustomerProfileService, $location) {

        var vm = this;
        vm.create = create;
        vm.getPath = getPath;

        $scope.file_changed = function(element) {

            $scope.$apply(function(scope) {
                var photofile = element.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    // handle onload
                    $scope.img = e.target.result;
                };
                reader.readAsDataURL(photofile);

                console.log(photofile);
            });
        };

        function getPath($file){
            $file.get
           // var path = document.getElementById("image").value;

            alert(path);
        }

        function create(newCustomer){
          //  newCustomer._id = (new Date).getTime();
            newCustomer.role = "customer";
//            console.log(newCustomer);

            UserService.createUser(newCustomer)
                .then(function(res){
                  //  console.log(res.data);
                    UserService.setCurrentUser(res.data);
                    $location.path("/customerProfile");
                });

        }
    }

})();