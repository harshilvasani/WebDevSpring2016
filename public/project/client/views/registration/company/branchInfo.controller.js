(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("BranchInfoRegistrationController", BranchInfoRegistrationController);

    function BranchInfoRegistrationController(BranchService, CompanyService, UserService, $location) {

        var vm = this;

        vm.saveBranch = saveBranch;
        vm.removeBranch = removeBranch;
        vm.addBranch = addBranch;
        vm.registerCompany = registerCompany;

        function init(){

            var branches = null;

            BranchService.getCurrentBranches()
                .then(function(res){
                    branches = res.data;

                    if(branches != null && branches != ""){
                        vm.branches = branches;
                    }
                    else{
                        vm.branches = [{}];
                    }

                });

        }
        init();

        function saveBranch(allBranches){
            BranchService.setCurrentBranches(allBranches)
                .then(function(res){

                });
        }

        function addBranch(){
            vm.branches.push({});
        }

        function removeBranch(index){
            vm.branches.splice(index,1);
        }

        function registerCompany(){

            var owner = null;
            var company = null;
            var branches = vm.branches;

            UserService.getCurrentOwner()
                .then(function(res){
                    owner = res.data;

                    CompanyService.getCurrentCompany()
                        .then(function(res){
                            company = res.data;

                            if(owner == null){
                                owner = {};
                            }

                            owner.role = "owner";
                            owner.company = company.companyName;

                            if(company == null){
                                company = {};
                            }

                            for(var i in branches){

                                var newManager = branches[i];//new user
                                newManager.role = "manager";

                                var newBranch = branches[i];//new Branch
                                newBranch.company = company.companyName;

                                UserService.createUser(newManager);
                                BranchService.createBranch(newBranch);
                            }

                            UserService.createUser(owner);
                            CompanyService.createCompany(company);

                            UserService.setCurrentUser(owner);

                            UserService.setCurrentOwner(null)
                                .then(function(res){

                                });

                            CompanyService.setCurrentCompany(null)
                                .then(function(res){

                                });

                            BranchService.setCurrentBranches([{}])
                                .then(function(res){

                                });

                            $location.path("/ownerProfile");
                        });
                });
        }
    }

})();