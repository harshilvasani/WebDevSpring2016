(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("BranchService",BranchService);

    var branches = [];

    function BranchService($rootScope) {
        var branches = [
            {	"_id":101,
                "firstName" : "Thea" , "lastName" : "Queen",
                "username":"thea",  "password":"thea",
                "branchId": "B-01", "company" : "comapny-1"},

            {	"_id":102,
                "firstName" : "Oliver" , "lastName" : "Queen",
                "username":"oliver",  "password":"oliver",
                "branchId": "B-02", "company" : "comapny-1"},

            {	"_id":103,
                "firstName" : "Sara" , "lastName" : "Lance",
                "username": "sara",  "password":"sara",
                "branchId": "B-03", "company" : "comapny-1"},

            {	"_id":104,
                "firstName" : "John" , "lastName" : "Diggle",
                "username": "john",  "password":"john",
                "branchId": "B-01", "company" : "comapny-2"},

            {	"_id":105,
                "firstName" : "Felicity" , "lastName" : "Smoak",
                "username": "felicity",  "password":"felicity",
                "branchId": "B-02", "company" : "comapny-2"}
        ]


        var api = {
            findAllBranches : findAllBranches,
            createBranch : createBranch,
            updateBranch : updateBranch,
            deleteBranch : deleteBranch
        }

        return api;

        function findAllBranches(callback) {
            callback(branches);
        }

        function createBranch(branch, callback) {
            branches.push(branch);
            callback(branch);
        }

        function updateBranch(branchId, branch, callback) {
            for(var i in branches){
                if(branches[i]._id==branchId){
                    branches[i]=branch;
                    callback(branches[i]);
                    break;
                }
            }
        }
        function deleteBranch(branchId, callback) {
            for(var i in branches){
                if(branches[i]._id==branchId){
                    branches.splice(i,1);
                    callback(branches);
                    break;
                }
            }
        }
    }
})();