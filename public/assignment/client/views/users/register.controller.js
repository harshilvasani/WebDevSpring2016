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

                var emails = user.emails.toString().split(",");

                var newUser={
                            "firstName":"",
                            "lastName":"",
                            "username":user.username,
                            "password":user.password,
                            "emails" : emails,
                            "roles": ["student"]	}
            }
            UserService
                .register(newUser)
                .then(
                  function(doc){
                      UserService.setCurrentUser(newUser);
                      $location.path('/profile');
                  }
                );
        }
    }
})();