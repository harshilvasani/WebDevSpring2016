(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("BranchService",BranchService);

    function BranchService($http) {

        var api = {
            findAllBranches : findAllBranches,
            findAllBranchesByCompany : findAllBranchesByCompany,
            createBranch : createBranch,
            updateBranch : updateBranch,
            deleteBranch : deleteBranch
        }

        return api;

        function findAllBranches() {
            return $http.get("/api/project/branch");
        }

        function findAllBranchesByCompany(company) {
            return $http.get("/api/project/Company/" + company + "/branch");
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