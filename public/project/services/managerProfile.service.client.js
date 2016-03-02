(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("ManagerProfileService",ManagerProfileService);

    var managers = [];

    function CustomerProfileService($rootScope) {
        var managers = [
            {	"_id":101, "company":"company-1", "branchId":"B-01",
                "firstName":"Thea","lastName":"Queen",
                "username":"dan", "password":"dan",
                "address":"221 Baker Street", "city":"Hell's Kitche ", "state":"NY", "zip":"61200",
                "emailid":"thea@qween.com", "contactnum":"920 345 6789",
                "role": "manager"		},

            {	"_id":102, "company":"company-2","branchId":"B-02",
                "firstName":"Oliver","lastName":"Queen",
                "username":"ed","password":"ed",
                "address":"345 Palmer Street", "city":"Starling City", "state":"MA", "zip":"61220",
                "emailid":"oliver@queen.com", "contactnum":"880 345 6789",
                "role": "manager"		}
        ]


        var api = {
            findManagerByCredentials : findManagerByCredentials,
            findAllManagerByCompany : findAllManagerByCompany,
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

        function findManagerByCredentials(username, password, callback) {
            var manager = null;
            for(var i in managers){
                if(managers[i].username==username && managers[i].password==password){
                    manager=managers[i];
                    break;
                }
            }
            callback(manager);

        }

        function findAllManagerByCompany(company, callback) {
            var managers = [];
            for(var i in customers){
                if(customers[i].company==company){
                    managers.push(customers[i]);
                }
            }
            callback(customers);
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