(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("BranchController", BranchController);

    function BranchController($scope, BranchService) {
        //Event Handler's declaration
        $scope.addBranch = addBranch;
        $scope.selectBranch = selectBranch;
        $scope.deleteBranch = deleteBranch;
        $scope.updateBranch = updateBranch;

        $scope.index = -1;

        /*-----------users event Handler's implementation-----------*/
        BranchService.findAllBranches(renderAllBranches);

        function renderAllBranches(allBranches) {
            $scope.branches = allBranches;
        }

        function addBranch(branch){
            if(branch != null)
                BranchService.createBranch(branch, renderAddBranch);
        }

        function renderAddBranch(newBranch){
            //  console.log($scope.bookings);
            // $scope.bookings.push(newBooking);
            $scope.branch = null;
        }

        function selectBranch(index){
            $scope.index = index;
            var selectedBranch = $scope.branches[index];
            $scope.branch = {"firstNmae" : selectedBranch.firstNmae,
                "lastNmae": selectedBranch.lastNmae,
                "username" : selectedBranch.username,
                "password": selectedBranch.password,
                "company": selectedBranch.company,
                "branchId": selectedBranch.branchId}
        }

        function deleteBranch(index){
            BranchService.deleteBranch($scope.branches[index]._id,renderDeleteBranch);
        }

        function renderDeleteBranch(allBranch){
            //  BookingService.getAllBookings(renderAllBookings);
        }

        function updateBranch(branch){
            if($scope.index != -1)
            {
                BranchService.updateBranch($scope.branches[$scope.index]._id,branch,renderUpdateBranch);
                $scope.index = -1;
                $scope.branch = null;
            }
        }

        function renderUpdateBranch (updatedBranch){
            //BookingService.getAllBookings(renderAllBookings);
        }
    }
})();