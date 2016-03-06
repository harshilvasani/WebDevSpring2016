/**
 * Created by Harshin on 13-Feb-16.
 */

(function(){
    $(init);// this means that init function willl be called after page is load


    var $movieTitleTxt;
    var $searchBtn;
    var $resultTable;

    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE";
    var DETAIL_URL = "http://www.omdbapi.com/?s=IMDBID"

    function init(){
       // alert("jQuery is installed successfully");


        $movieTitleTxt = $("#movieTitleTxt");
        $searchBtn = $("#searchBtn");
        $resultTable=$("#resultTable tbody");
        $searchBtn.click(searchMovie);
    }

    function searchMovie(){
        $resultTable.empty();



        var title = $movieTitleTxt.val();
        var URL = SEARCH_URL.replace("TITLE",title);


        // jQuery allows us to create AJAX calls, AJAX is a tech that allows
        // browser to make netwrk connection using url or ip addres

        // AJAX allows us to create this Queries asynchronously
        // means we dont wait till the response is given, we continue to interact with user


        $.ajax({
            url : URL,
            success : renderSearchResults//this function will be called by AJAX if request is successful
                                         // this are Call Back function
        });//object in curly braces is JSON Object
    }

    function renderSearchResults(response){

        $("#resp")
            .html("Total search results:"+response.totalResults);

        var movies = response.Search;


        for(var m=0;m<movies.length;m++){
            var movie = movies[m];
            var title=movie.Title;
            var posterUrl=movie.Poster.toString();
            var year=movie.Year;
            var id=movie.imdbID;

            console.log(movie);

            var TR = $("<tr>")
                .attr("id",id)
                .click(fetchMovieDetails);

            var TD = $("<td>")
                .appendTo(TR);

            var $img=$("<img>")
                .attr("src",posterUrl)
                .addClass("posterImg")
               /* .attr("height","75px")
                .attr("width","75px")*/
                .appendTo(TD);

            TD = $("<td>")
                .append(title)
                .appendTo(TR);

            TD = $("<td>")
                .append(year)
                .appendTo(TR);

            TD = $("<td>")
                .append(id)
                .appendTo(TR);

            $resultTable.append(TR);

           /* $("#resp")
                .append($img)*/
        }

    }

    function fetchMovieDetails(event){//event object is created by browser when an event happens it stores all meta information
        alert("row clicked "+event.currentTarget.id);

        var $TR=$(event.currentTarget);
        var $imdbID = $TR.attr("id");// has double use, if has 1 argument its get if 2 then its set

        var detailUrl = DETAIL_URL.replace("IMDBID",imdbID);
    }

})();//known as IIFE : Immediately Invoked Function Expression
