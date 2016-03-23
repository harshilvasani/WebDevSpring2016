(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("BranchController", BranchController);

    function BranchController(BranchService) {

        var vm = this;
        //Event Handler's declaration
        vm.addBranch = addBranch;
        vm.selectBranch = selectBranch;
        vm.deleteBranch = deleteBranch;
        vm.updateBranch = updateBranch;

        vm.index = -1;

        /*-----------users event Handler's implementation-----------*/

        function init(){
            BranchService
                .findAllBranches()
                .then(
                    function(response){
                        vm.branches = response.data;
                    }
                );
        }

        init();

        function addBranch(branch){
            if(branch != null)
                BranchService
                    .createBranch(branch)
                    .then (
                        function (response){
                            vm.branch = null;
                            init();
                        }
                    );
        }

        function selectBranch(index){
            vm.index = index;
            var selectedBranch = vm.branches[index];
            vm.branch = {"firstName" : selectedBranch.firstName,
                "lastName": selectedBranch.lastName,
                "username" : selectedBranch.username,
                "password": selectedBranch.password,
                "company": selectedBranch.company,
                "branchId": selectedBranch.branchId}
        }

        function deleteBranch(index){
            BranchService
                .deleteBranch(vm.branches[index]._id)
                .then(
                    function (response){
                        init();
                    }
                );
        }

        function updateBranch(branch){
            if(vm.index != -1)
            {
                branch._id = vm.branches[vm.index]._id;
                BranchService
                    .updateBranch(vm.branches[vm.index]._id,branch)
                    .then(
                        function (response){
                            vm.index = -1;
                            vm.branch = null;
                            init();
                        }
                    );

            }
        }
    }
})();