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
        vm.updateCompany = updateCompany;

        function init(){

            var branches = null;

            BranchService.getCurrentBranch()
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
            BranchService.setCurrentBranch(allBranches)
                .then(function(res){

                });
        }

        function addBranch(){
            vm.branches.push({});
        }

        function removeBranch(index){
            vm.branches.splice(index,1);
        }

        function updateCompany(){
            var owner = UserService.getCurrentOwner();
            var company = CompanyService.getCurrentCompany();
            var branches = vm.branches;

            if(owner == null){
                owner = {};
            }

            owner._id = (new Date).getTime();
            owner.role = "owner";
            owner.company = company.companyName;

            if(company == null){
                company = {};
            }

            company._id = (new Date).getTime();

            for(var i in branches){
                branches[i]._id = (new Date).getTime();

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
            UserService.setCurrentOwner(null);
            CompanyService.setCurrentCompany(null);
            BranchService.setCurrentBranch([{}]);

            $location.path("/ownerProfile");
        }
    }

})();