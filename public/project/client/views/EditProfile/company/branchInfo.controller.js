(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("BranchInfoEditController", BranchInfoEditController);

    function BranchInfoEditController(BranchService, CompanyService, UserService, $location) {

        var vm = this;

        vm.saveBranch = saveBranch;
        vm.removeBranch = removeBranch;
        vm.addBranch = addBranch;
        vm.updateCompany = updateCompany;

        var managers;

        function init(){

            var owner = UserService.getCurrentOwner();

            BranchService
                .findAllBranchesByCompany(owner.company)
                .then(
                    function(response){
                        vm.branches = response.data;
                        BranchService.setCurrentBranch(vm.branches)
                    }
                );

           // console.log(owner.company);
            UserService
                .findAllManagersByCompany(owner.company)
                .then(
                    function (response){
                        managers = response.data;
                 //       console.log(managers);
                    }
                );
        }
        init();

        function saveBranch(allBranches){
            BranchService.setCurrentBranch(allBranches);
        }

        function addBranch(){
            vm.branches.push({});
        }

        function removeBranch(index){


            BranchService
                .deleteBranch(vm.branches[index]._id);
            UserService
                .deleteUser(managers[index]._id);

            vm.branches.splice(index,1);
            managers.splice(index,1);
        }

        function updateCompany(){
            var owner = UserService.getCurrentOwner();
            var company = CompanyService.getCurrentCompany();
            var branches = vm.branches;

            owner.company = company.companyName;

            for (var i in managers){
                managers[i].branchId = branches[i].branchId;
                managers[i].company = company.companyName;
                managers[i].firstName = branches[i].firstName;
                managers[i].lastName = branches[i].lastName;
                managers[i].username = branches[i].username;
                managers[i].password = branches[i].password;

                branches[i].company = company.companyName;

                UserService
                    .updateUser(managers[i]._id,managers[i]);

                BranchService
                    .updateBranch(branches[i]._id,branches[i]);

            }

            for(var i in branches){
                if(i >=  managers.length){

                    var newManager = branches[i];//new user
                    newManager.role = "manager";

                    var newBranch = branches[i];//new Branch
                    newBranch.company = company.companyName;

                    UserService
                        .createUser(newManager);
                    BranchService
                        .createBranch(newBranch);
                }
            }

            UserService.updateUser(owner._id,owner);
            CompanyService.updateCompany(company._id,company);
            UserService.setCurrentUser(owner);

            UserService.setCurrentOwner(null);
            CompanyService.setCurrentCompany(null);
            BranchService.setCurrentBranch([{}]);

            $location.path("/ownerProfile");
        }
    }

})();