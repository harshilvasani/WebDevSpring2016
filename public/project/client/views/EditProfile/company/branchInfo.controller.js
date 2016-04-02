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

            var owner = null;

            UserService.getCurrentOwner()
                .then(function(res){

                    owner = res.data;

                    BranchService.getCurrentBranches()
                        .then(function(res){
                            //console.log(res);

                            if(res.data != ""){
                            //    console.log(res.data);
                                vm.branches = res.data;
                            }

                            else{
                                BranchService
                                    .findAllBranchesByCompany(owner.company)
                                    .then(
                                        function(response){
                                            vm.branches = response.data;
                                            BranchService.setCurrentBranches(vm.branches)
                                                .then(function(res){

                                                });
                                        }
                                    );
                            }
                        })

                    UserService
                        .findAllManagersByCompany(owner.company)
                        .then(
                            function (response){
                                managers = response.data;
                                //       console.log(managers);
                            }
                        );
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
            BranchService
                .deleteBranch(vm.branches[index]._id);
            UserService
                .deleteUser(managers[index]._id);

            vm.branches.splice(index,1);
            managers.splice(index,1);
        }

        function updateCompany(){
            var owner = null;
            var company = null;
            var branches = vm.branches;

            UserService.getCurrentOwner()
                .then(function (res) {
                    owner = res.data;

                    CompanyService.getCurrentCompany()
                        .then(function(res){
                            company = res.data;

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

                            UserService.setCurrentOwner(owner)
                                .then(function(res){

                                });

                            CompanyService.setCurrentCompany(company)
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