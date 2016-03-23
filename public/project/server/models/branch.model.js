var q = require("q");

module.exports = function(app) {

    var branches = require("./branch.mock.json");

    var api = {
        findAllBranches : findAllBranches,
        findAllBranchesByCompany : findAllBranchesByCompany,
        findBranchById : findBranchById,

        createBranch : createBranch,
        updateBranch : updateBranch,
        deleteBranch : deleteBranch
    }

    return api;

    function findAllBranches() {
        var deferred = q.defer();
        deferred.resolve(branches);

        return deferred.promise;
    }

    function findAllBranchesByCompany(company) {
        var myBranches = [];

        for(var i in branches){
            if(branches[i].company == company){
                myBranches.push(branches[i]);
            }
        }
        var deferred = q.defer();
        deferred.resolve(myBranches);

        return deferred.promise;
    }

    function findBranchById(Id) {
        var branch = null;
        for(var i in branches){
            if(branches[i]._id == Id){
                branch = branches[i];
                break;
            }
        }
        var deferred = q.defer();
        deferred.resolve(branch);

        return deferred.promise;
    }

    function createBranch(branch) {
        branch._id = (new Date).getTime();
        branches.push(branch);

        var deferred = q.defer();
        deferred.resolve(branches);

        return deferred.promise;
    }

    function updateBranch(Id, branch) {
        for(var i in branches){
            if(branches[i]._id == Id){
                branches[i]=branch;
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(branch);

        return deferred.promise;
    }

    function deleteBranch(branchId) {
        for(var i in branches){
            if(branches[i]._id==branchId){
                branches.splice(i,1);
                break;
            }
        }
        var deferred = q.defer();
        deferred.resolve(branches);

        return deferred.promise;
    }
}