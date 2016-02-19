(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function HeaderController($scope, CourseService) {

        $scope.courses = CourseService.getAllCourses();

        $scope.removeCourse = function(index) {
            console.log(index);
            $scope.courses.splice(index, 1);
        }
    }
})();