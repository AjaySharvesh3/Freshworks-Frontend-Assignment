/* Function used to get the Movie Name from the user,
   and showing data in the card-view manner with Image and Movie Name */
function searchMovies() {
    var name = document.getElementById('movieName');
    const fetchPromise = fetch("http://www.omdbapi.com/?apikey=72122887&s=" + name.value);
    fetchPromise.then(response => {
        return response.json();
    }).then(Search => {
        main.innerHTML = cardHTML(Search);
    }).catch(error => {
        console.log("Error: ", error);
        main.innerHTML = errorAlertHTML();
    });
}

/* Passing the list of movies to this function and getting populated by card-view,
   byt showing Image and name of the Movie */
function cardHTML(Search) {
    let values = Search["Search"];
    let movieCards =  ('<div class="row" style="position: absolute; margin-left: 50px; margin-top: 50px" >');

    // Looping every cards of data in it...

    values.forEach(movie => {
       /* var search = Movie.Search;*/
        movieCards += `<div class="column" style="margin-right: 20px">
                        <div class="card" onclick="setSelectedMovie('${movie.Title}')">
                        <img src="${movie.Poster}" alt="flag" style="width:50%; height: 50%">
    <div class="container"><h4><b>${movie.Title}</b></h4></div></div></div>`;
    });

    movieCards += '</div>';
    return movieCards;
}

/* [ADDITIONAL] Error Handling takes place,
   if the user click search button without entering anything and,
   misspelled or wrong name in search bar, will return error message */
function errorAlertHTML() {
    var errorMessage = ('<div class="alert alert-error" role="alert">');
    errorMessage +=  ('No search results found!');
    errorMessage += ('</div>');
    return errorMessage;
}

/* This function handles, redirecting to next page,
   and setting the data in LocalStorage,
   to view details of Movie in the next page. */
function setSelectedMovie(Movie) {
    localStorage.setItem("movieName", Movie);
    var name = document.getElementById('movieName');
    localStorage.setItem("SearchTerm", name.value);
    window.location.href = "movie-details/movie-details.html";
}

/* Search will call searchmovies() function,
   while typing and displaying in card. No need of button search. */
function searchMoviesOnTypeAhead() {
    var name = document.getElementById('movieName');
    if (name.value.length > 1) {
        searchMovies();
    }
}

/* Initiate the search by calling searchmovies(),
   after redirecting to Details Page to Home,
   it shows the previous search results in card view */
 function init() {
    var name = localStorage.getItem('SearchTerm');
    console.log("Name:", name);
    if (name !== null && name !== '') {
        document.getElementById("movieName").value = name;
        searchMovies();
    }
 }

 // Calling Init function
 init();
