(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location) {

        var vm = this;
        //Event Handler's declaration
        vm.register=register;

        //Event Handler's implementation
        function register(user){

            if(user.password==user.verifyPassword){

                var newUser={"_id":(new Date).getTime(),
                            "firstName":null,
                            "lastName":null,
                            "username":user.username,
                            "password":user.password,
                            "roles": []	}
            }
            UserService
                .createUser(newUser)
                .then(
                  function(doc){
                      UserService.setCurrentUser(newUser);
                      $location.path('/profile');
                  }
                );
        }
    }
})();