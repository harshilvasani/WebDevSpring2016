/**
 * Created by Harshin on 10-Feb-16.
 */

(function()
{
    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", MovieListController);

    function MovieListController($scope){
        console.log("harshil vasani");
        var Movies = [
            {id:"123",title:"avatar",year:"1992"},
            {id:"234",title:"dhoom",year:"2001"}
        ];

        //1st movies variable is used inredering data by view, 2nd one is local movies declared here
        $scope.movies = Movies;

        //Event Handlers
        $scope.addMovie = addMovieFunc;
        $scope.deleteMovie = deleteMovieFunc;
        $scope.selectMovie = selectMovieFunc;
        $scope.doneMovie = doneMovieFunc;
        $scope.clearMovie = clearMovieFunc;
        //----------

        //Event Handlers implemetation
        function addMovieFunc(movie) {
            console.log($scope.movie);
            var newMovie={
                id:movie.id,
                title:movie.title,
                year:movie.year
            };
            $scope.fmovie={};
            $scope.movies.push(newMovie);
        }

        function deleteMovieFunc(movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index,1);
        }



        function selectMovieFunc(movie) {
            $scope.selectedMovieIndex=$scope.movies.indexOf(movie);
            var selMovie={
                id:movie.id,
                title:movie.title,
                year:movie.year
            };
            $scope.fmovie=selMovie;
        }

        function doneMovieFunc(movie) {
             $scope.movies[$scope.selectedMovieIndex]={
                id:movie.id,
                title:movie.title,
                year:movie.year
            };

        }

        function clearMovieFunc() {
            $scope.fmovie={};

        }

    }
})();
