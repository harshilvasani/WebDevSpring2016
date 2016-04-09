var q = require("q");

module.exports = function(app , db, mongoose) {

    var BranchSchema  = require("./branch.schema.server.js")(mongoose);

    var branches = mongoose.model("branches", BranchSchema);

    var api = {
        findAllBranches : findAllBranches,
        findAllBranchesByCompany : findAllBranchesByCompany,
        findBranchByByCompanyandId : findBranchByByCompanyandId,

        createBranch : createBranch,
        updateBranch : updateBranch,
        deleteBranch : deleteBranch
    }

    return api;

    function findAllBranches() {
        var myBranches = [];
        var deferred = q.defer();

        branches.find(function (err,results){
            if(!err){
                // console.log(results);
                myBranches = results;
                deferred.resolve(myBranches);
            }
        });

        return deferred.promise;
    }

    function findAllBranchesByCompany(company) {
        var myBranches = [];
        var deferred = q.defer();

        console.log("------------------------------------------------------------------------"+company);
        branches.find({company : company},
            function (err,results){
                if(!err){
                    // console.log(results);
                    myBranches = results;
                    deferred.resolve(myBranches);
                }
            });

        return deferred.promise;
    }

    function findBranchByByCompanyandId(company,branchId) {
        var branch = null;
        var deferred = q.defer();

        branches.find({$and: [{company : company},{branchId : branchId}]},
            function (err,results){
                if(!err){
                    // console.log(results);
                    branch = results;
                    deferred.resolve(branch[0]);
                }
            });

        return deferred.promise;
    }

    function createBranch(branch) {
        var deferred = q.defer();

        branches.create(branch,function (err,results){

            // console.log(results);
            if(!err) {
                console.log(results);
                deferred.resolve(results);
            }
            else {
                console.log(err);
                deferred.resolve(null);
            }});

        return deferred.promise;
    }

    function updateBranch(Id, branch) {
        var deferred = q.defer();

        branches.update(
            {_id : Id},

            {$set: {"firstName": branch.firstName,
                "lastName": branch.lastName,
                "username": branch.username,
                "password": branch.password,
                "company": branch.company,
                "branchId": branch.branchId
            }},

            function (err,results){
                if(!err) {
                    deferred.resolve(results[0]);
                }
                else {
                    deferred.resolve(null);
                }
            });

        return deferred.promise;
    }

    function deleteBranch(Id) {
        var deferred = q.defer();

        branches.remove({_id : Id},function (err,results){
            if(!err) {
                deferred.resolve(results);
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }
}