(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("BranchService",BranchService);

    function BranchService($http,$rootScope) {

        var api = {
            setCurrentBranch : setCurrentBranch,
            getCurrentBranch : getCurrentBranch,
            findAllBranches : findAllBranches,
            findAllBranchesByCompany : findAllBranchesByCompany,
            findBranchByByCompanyandId : findBranchByByCompanyandId,
            createBranch : createBranch,
            updateBranch : updateBranch,
            deleteBranch : deleteBranch,
            setCurrentBranches : setCurrentBranches,
            getCurrentBranches : getCurrentBranches
        }

        return api;

        function setCurrentBranches (branches) {
            var curBranches = $http.post("/api/project/setCurBranches",branches);
            //  console.log(curOwner);
            return curBranches;
        }

        function getCurrentBranches () {
            return $http.get("/api/project/getCurBranches");
        }

        function setCurrentBranch(branch){
            $rootScope.branch = branch;
        }

        function getCurrentBranch(){
            return $rootScope.branch;
        }

        function findAllBranches() {
            return $http.get("/api/project/branch");
        }

        function findAllBranchesByCompany(company) {
            return $http.get("/api/project/Company/" + company + "/branch");
        }

        function findBranchByByCompanyandId(company,branchId){
            return $http.get("/api/project/Company/" + company + "/branch/" + branchId);
        }

        function createBranch(branch) {
            return $http.post("/api/project/branch",branch);
        }

        function updateBranch(branchId, branch) {
            return $http.put("/api/project/branch/" + branchId,branch);
        }

        function deleteBranch(branchId) {
            return $http.delete("/api/project/branch/" + branchId);
        }
    }
})();