(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("ManagerProfileService",ManagerProfileService);

    var managers = [];

    function ManagerProfileService($rootScope) {
        var managers = [
            {	"_id":101, "company":"company-1", "branchId":"B-01",
                "firstName":"Thea","lastName":"Queen",
                "username":"bob", "password":"bob",
                "address":"221 Baker Street", "city":"Boston", "state":"MA", "zip":"61200",
                "emailid":"thea@qween.com", "contactnum":"920 345 6789",
                "role": "manager"		},

            {	"_id":102, "company":"company-1", "branchId":"B-02",
                "firstName":"Thea","lastName":"Queen",
                "username":"dan", "password":"dan",
                "address":"221 Baker Street", "city":"Newton", "state":"MA", "zip":"61200",
                "emailid":"thea@qween.com", "contactnum":"920 345 6789",
                "role": "manager"		},

            {	"_id":103, "company":"company-2","branchId":"B-01",
                "firstName":"Oliver","lastName":"Queen",
                "username":"ed","password":"ed",
                "address":"345 Palmer Street", "city":"Boston", "state":"MA", "zip":"61220",
                "emailid":"oliver@queen.com", "contactnum":"880 345 6789",
                "role": "manager"		}
        ]


        var api = {

            findAllManagerByCompany : findAllManagerByCompany,
            findAllManagerByLocation : findAllManagerByLocation,
            findAllManagerByLocationandComapany : findAllManagerByLocationandComapany,
            createManager : createManager,
            updateManager : updateManager,
            setCurrentManager: setCurrentManager,
            getCurrentManager: getCurrentManager
        }

        return api;

        function setCurrentManager (manager) {
            $rootScope.currentManager = manager;
        }

        function getCurrentManager () {
            return $rootScope.currentManager;
        }

        function findAllManagerByCompany(company, callback) {
            var myManager = [];
            for(var i in managers){
                if(managers[i].company==company){
                    myManager.push(managers[i]);
                }
            }
            callback(myManager);
        }

        function findAllManagerByLocation(city, state, callback) {
            var myManager = [];
            for(var i in managers){
                if(managers[i].state==state && managers[i].city==city){
                    myManager.push(managers[i]);
                }
            }
            callback(myManager);
        }

        function findAllManagerByLocationandComapany(city, state, company ,callback){
            var myManager = [];
            for(var i in managers){
                if(managers[i].state==state && managers[i].city==city && managers[i].company==company){
                    myManager.push(managers[i]);
                }
            }
            callback(myManager);
        }

        function createManager(manager, callback) {
            managers.push(manager);
            callback(manager);
        }

        function updateManager(managerId, manager, callback) {
            for(var i in managers){
                if(managers[i]._id == managerId){
                    managers[i]= manager;
                    callback(managers[i]);
                    break;
                }
            }
        }
    }
})();