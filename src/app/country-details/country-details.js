function getCountryName() {
    var country = localStorage.getItem('CountryNames');
    getCountryDetails(country);
    countryName.innerHTML = `<h1>${country}</h1>`;
}

function getCountryDetails(country) {
    var getCountryUrl = fetch('https://restcountries.eu/rest/v2/name/' + country + '?fullText=true');
    getCountryUrl.then(response => {
        return response.json();
    }).then(details => {
        countryDetails.innerHTML = tableHTML(details);
        //main.innerHTML = countriesList(countries);
    });
}

function tableHTML(details) {
    console.log(details);
    var selectedCountryDetails = details[0];
    console.log(selectedCountryDetails);
    console.log('Name: ', selectedCountryDetails.name);
    console.log('Country Code: ', selectedCountryDetails.alpha2Code);
    console.log('Capital: ', selectedCountryDetails.capital);
    console.log('Region: ', selectedCountryDetails.region);
    console.log('Population: ', selectedCountryDetails.population);
    console.log('Native Name: ', selectedCountryDetails.nativeName);
    var countryDetailTable =  ('<table id="country-table">');
    countryDetailTable += ('<tbody>');

    countryDetailTable += (`<tr><th>Name</th><td>${selectedCountryDetails.name}</td></tr>`);
    countryDetailTable += (`<tr><th>Code</th><td>${selectedCountryDetails.alpha2Code}</td></tr>`);
    countryDetailTable += (`<tr><th>Capital</th><td>${selectedCountryDetails.capital}</td></tr>`);
    countryDetailTable += (`<tr><th>Region</th><td>${selectedCountryDetails.region}</td></tr>`);
    countryDetailTable += (`<tr><th>Population</th><td>${selectedCountryDetails.population}</td></tr>`);

    countryDetailTable += ('</tbody>');
    countryDetailTable += ('</table>');
    return countryDetailTable;
}

getCountryName();
