/* Gets the movie name,
   from the LocalStorage and passing that movieName to getmovieDetails() function */
function getmovieName() {
    var movie = localStorage.getItem('movieName');
    getmovieDetails(movie);
    movieName.innerHTML = `<div id="movieHeader" style="color: white; font-size: 30px; margin-top: 25px; margin-left: 55px;">${movie}</div>`;
}

/* Passing the movie Name from the LocalStorage,
   and using the another API(FULL TEXT),
   to get all the details from it. */
function getmovieDetails(movie) {
    var getmovieUrl = fetch('http://www.omdbapi.com/?apikey=72122887&t=' +  movie);
    console.log("Details API: ", getmovieUrl);
    getmovieUrl.then(response => {
        return response.json();
    }).then(details => {
        // Insert the HTML code, that are been called from the API
        console.log("Details: ", details);
        movieDetails.innerHTML = tableHTML(details);
    });
}

/* Passing the list of data to this function and getting a single movie data,
   and performing Table population,
   to get to know the details of that movie. */
function tableHTML(details) {
    /*var selectedmovieDetails = details[0];
    var abbrNums = abbrNum(selectedmovieDetails.population, 2);*/

    /*movieHeader.innerHTML = "<img src=`${selectedmovieDetails.flag}`>";
    console.log(movieHeader.innerHTML);*/
    /* Statically adding table rows to view the details of movie */
    var movieDetailTable =  ('<table id="movie-table" style="font-size: 20px; ' +
                                                                'display: table; ' +
                                                                'border-collapse: separate; ' +
                                                                'padding: 20px;' +
                                                                'margin-bottom: 100px;' +
                                                                'width: 500px">' );

    movieDetailTable += ('<tbody>');

    // Fetching the

    movieDetailTable += (`<tr>
                            <th style="padding: 15px">Poster</th>
                            <td style="padding: 15px; color: #424242"><img style="width: 120px; height: 140px" src="${details.Poster}"></td>
                            </tr>`);


    movieDetailTable += (`<tr>
                            <th style="padding: 15px">Title</th>
                            <td style="padding: 15px; color: #424242">${details.Title}</td>
                            </tr>`);

    movieDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px;">Year</th>
                            <td style="padding: 15px;  color: #424242">${details.Year}</td>
                            </tr>`);

    movieDetailTable += (`<tr>
                            <th style="padding: 15px">Rated</th>
                            <td style="padding: 15px; color: #424242">${details.Rated}</td>
                            </tr>`);

    movieDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px;">Released</th>
                            <td style="padding: 15px;  color: #424242">${details.Released}</td>
                            </tr>`);

    movieDetailTable += (`<tr>
                            <th style="padding: 15px">Runtime</th>
                            <td style="padding: 15px; color: #424242">${details.Runtime}</td>
                            </tr>`);

    movieDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px">Genre</th>
                            <td style="padding: 15px;  color: #424242">${details.Genre}</td>
                            </tr>`);

    movieDetailTable += (`<tr>
                            <th style="padding: 15px">Directors</th>
                            <td style="padding: 15px;  color: #424242">${details.Director}</td>
                            </tr>`);

    movieDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px">Language</th>
                            <td style="padding: 15px;  color: #424242">${details.Language}</td>
                            </tr>`);

    movieDetailTable += (`<tr>
                            <th style="padding: 15px">Country</th>
                            <td style="padding: 15px;  color: #424242; font-weight: 100">+${details.Country}</td>
                            </tr>`);

    movieDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px">BoxOffice</th>
                            <td style="padding: 15px;  color: #424242; font-weight: 100">+${details.BoxOffice}</td>
                            </tr>`);

    movieDetailTable += (`<tr>
                            <th style="padding: 15px">Production</th>
                            <td style="padding: 15px;  color: #424242; font-weight: 100">+${details.Production}</td>
                            </tr>`);

    movieDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px">Awards</th>
                            <td style="padding: 15px;  color: #424242; font-weight: 100">+${details.Awards}</td>
                            </tr>`);


    movieDetailTable += (`<tr>
                            <th style="padding: 15px">IMDB Votes</th>
                            <td style="padding: 15px;  color: #424242; font-weight: 100">+${details.imdbVotes}</td>
                            </tr>`);

    movieDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px">IMDB Rating</th>
                            <td style="padding: 15px;  color: #424242; font-weight: 100">+${details.imdbRating}</td>
                            </tr>`);

    movieDetailTable += ('</tbody>');
    movieDetailTable += ('</table>');
    return movieDetailTable;
}

/* Converting the Population data from the API which is '1295210000'
 changed to '1.3B', to well known understandable*/
function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "K", "M", "B", "T" ];

    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
            number = Math.round(number*decPlaces/size)/decPlaces;
            if((number === 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }
            number += abbrev[i];
            break;
        }
    }
    return number + " People";
}

// Calling the function, to invoke the movie Name in the Div Tag
getmovieName();
