(function() {

    "use strict";

    angular
        .module("VehicleBookingApp")
        .controller("CompanyController", CompanyController);

    function CompanyController($scope, CompanyService) {
        //Event Handler's declaration
        $scope.addCompany = addCompany;
        $scope.selectCompany = selectCompany;
        $scope.deleteCompany = deleteCompany;
        $scope.updateCompany = updateCompany;

        $scope.index = -1;

        /*-----------users event Handler's implementation-----------*/
        CompanyService.findAllCompanys(renderAllCompanys);

        function renderAllCompanys(allCompanys) {
            $scope.companys = allCompanys;
        }

        function addCompany(company){
            if(company != null && $scope.index==-1)
                CompanyService.createCompany(company, renderAddCompany);
        }

        function renderAddCompany(newCompany){
            //  console.log($scope.bookings);
            // $scope.bookings.push(newBooking);
            $scope.company = null;
        }

        function selectCompany(index){
            $scope.index = index;
            var selectedCompany = $scope.companys[index];
            $scope.company = {"companyName" : selectedCompany.companyName ,
                "companyAddr" : selectedCompany.companyAddr,
                "city":selectedCompany.city,
                "state":selectedCompany.state,
                "zipCode": selectedCompany.zipCode}
        }

        function deleteCompany(index){
            CompanyService.deleteCompany($scope.companys[index]._id,renderDeleteCompany);
        }

        function renderDeleteCompany(allCompany){
            //  BookingService.getAllBookings(renderAllBookings);
        }

        function updateCompany(company){
            if($scope.index != -1)
            {
                CompanyService.updateCompany($scope.companys[$scope.index]._id,company,renderUpdateCompany);
                $scope.index = -1;
                $scope.company = null;
            }
        }

        function renderUpdateCompany (updatedCompany){
            //BookingService.getAllBookings(renderAllBookings);
        }
    }
})();