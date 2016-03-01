(function () {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .factory("CustomerProfileService",CustomerProfileService);

    var customers = [];

    function CustomerProfileService($rootScope) {
        var customers = [
            {	"_id":101, "firstName":"Alice","lastName":"Wonderland",
                "username":"alice", "password":"alice",
                "address":"75 Saint alphonsus", "city":"Boston", "state":"MA", "zip":"02120",
                "emailid":"alice@alice.com", "contactnum":"120 345 6789",
                "role": "customer"		},
            {	"_id":345, "firstName":"Virat","lastName":"Kohli",
                "username":"a","password":"a",
                "address":"75 Saint alphonsus", "city":"Munbai", "state":"Maharashtra", "zip":"02120",
                "emailid":"virat@kohli.com", "contactnum":"120 345 6789",
                "role": "customer"		}

        ]


        var api = {
            findCustomerByCredentials : findCustomerByCredentials,
            findAllCustomers : findAllCustomers,
            createCustomer : createCustomer,
            updateCustomer : updateCustomer,
            setCurrentCustomer: setCurrentCustomer,
            getCurrentCustomer: getCurrentCustomer
        }

        return api;

        function setCurrentCustomer (customer) {
            $rootScope.currentCustomer = customer;
        }

        function getCurrentCustomer () {
            return $rootScope.currentCustomer;
        }

        function findCustomerByCredentials(username, password, callback) {
            var customer=null;
            for(var i in customers){
                if(customers[i].username==username && customers[i].password==password){
                    customer=customers[i];
                    break;
                }
            }
            callback(customer);

        }

        function findAllCustomers(callback) {
            callback(customers);
        }

        function createCustomer(customer, callback) {
            customers.push(customer);
            callback(customer);
        }

        function updateCustomer(customerId, customer, callback) {
            for(var i in customers){
                if(customers[i]._id==customerId){
                    customers[i]=customer;
                    callback(customers[i]);
                    break;
                }
            }
        }
    }
})();