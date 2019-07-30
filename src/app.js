/* Function used to get the Country Name from the user,
   and showing data in the card-view manner with Image and Country Name */
function searchCountries() {
    var name = document.getElementById('countryName');
    const fetchPromise = fetch("https://restcountries.eu/rest/v2/name/" + name.value);
    fetchPromise.then(response => {
        return response.json();
    }).then(countries => {
        main.innerHTML = cardHTML(countries);
    }).catch(error => {
        console.log("Error: ", error);
        main.innerHTML = errorAlertHTML();
    })
    ;
}

/* Passing the list of countries to this function and getting populated by card-view,
   byt showing Image and name of the Country */
function cardHTML(countries) {
    var countryCards =  ('<div class="row" style="position: absolute; margin-left: 50px; margin-top: 50px" >');

    // Looping every cards of data in it...
    countries.forEach(country => {
        countryCards += `<div class="column" style="margin-right: 20px">
                        <div class="card" onclick="setSelectedCountry('${country.name}')">
                        <img src="${country.flag}" alt="flag" style="width:50%; height: 50%">
    <div class="container"><h4><b>${country.name}</b></h4></div></div></div>`;
    });

    countryCards += '</div>';
    return countryCards;
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
   to view details of country in the next page. */
function setSelectedCountry(country) {
    localStorage.setItem("CountryNames", country);
    var name = document.getElementById('countryName');
    localStorage.setItem("SearchTerm", name.value);
    window.location.href = "country-details/country-details.html";
}

/* Search will call searchCountries() function,
   while typing and displaying in card. No need of button search. */
function searchCountriesOnTypeAhead() {
    var name = document.getElementById('countryName');
    if (name.value.length > 1) {
        searchCountries();
    }
}

/* Initiate the search by calling searchCountries(),
   after redirecting to Details Page to Home,
   it shows the previous search results in card view */
 function init() {
    var name = localStorage.getItem('SearchTerm');
    console.log("Name:", name);
    if (name !== null && name !== '') {
        document.getElementById("countryName").value = name;
        searchCountries();
    }
 }

 // Calling Init function
 init();
