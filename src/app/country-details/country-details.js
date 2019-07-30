function getCountryName() {
    var country = localStorage.getItem('CountryNames');
    getCountryDetails(country);
    countryName.innerHTML = `<div style="color: white; font-size: 30px; margin-top: 25px; margin-left: 55px;">${country}</div>`;
}

getCountryName();

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
    var abbrNums = abbrNum(selectedCountryDetails.population, 2);
    console.log(selectedCountryDetails);
    console.log('Name: ', selectedCountryDetails.name);
    console.log('Country Code: ', selectedCountryDetails.alpha2Code);
    console.log('Capital: ', selectedCountryDetails.capital);
    console.log('Region: ', selectedCountryDetails.region);
    console.log('Population: ', abbrNums);
    console.log('Native Name: ', selectedCountryDetails.nativeName);
    var countryDetailTable =  ('<table id="country-table" style="font-size: 20px;  display: table; border-collapse: separate; padding-left: 0px; width: 500px">');
    countryDetailTable += ('<tbody>');

    countryDetailTable += (`<tr><th style="padding: 15px">Name</th><td style="padding: 15px">${selectedCountryDetails.name}</td></tr>`);
    countryDetailTable += (`<tr style="background-color: #2196F3; color: white"><th style="padding: 15px">Code</th><td style="padding: 15px">${selectedCountryDetails.alpha2Code}</td></tr>`);
    countryDetailTable += (`<tr><th style="padding: 15px">Capital</th><td style="padding: 15px">${selectedCountryDetails.capital}</td></tr>`);
    countryDetailTable += (`<tr style="background-color: #2196F3; color: white"><th style="padding: 15px">Region</th><td style="padding: 15px">${selectedCountryDetails.region}</td></tr>`);
    countryDetailTable += (`<tr><th style="padding: 15px">Population</th><td style="padding: 15px">${abbrNums}</td></tr>`);
    countryDetailTable += (`<tr style="background-color: #2196F3; color: white"><th style="padding: 15px">Timezone</th><td style="padding: 15px">${selectedCountryDetails.timezones[0]}</td></tr>`);
    countryDetailTable += (`<tr><th style="padding: 15px">Currency</th><td style="padding: 15px">${selectedCountryDetails.currencies[0].symbol} ${selectedCountryDetails.currencies[0].code}</td></tr>`);
    countryDetailTable += (`<tr style="background-color: #2196F3; color: white"><th style="padding: 15px">Language</th><td style="padding: 15px">${selectedCountryDetails.languages[0].name}</td></tr>`);
    countryDetailTable += (`<tr><th style="padding: 15px">Calling Code</th><td style="padding: 15px">+${selectedCountryDetails.callingCodes[0]} xxx xxx xxxx</td></tr>`);

    countryDetailTable += ('</tbody>');
    countryDetailTable += ('</table>');
    return countryDetailTable;
}

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number*decPlaces/size)/decPlaces;

            // Handle special case where we round up to the next abbreviation
            if((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
        }
    }

    return number + " People";
}
