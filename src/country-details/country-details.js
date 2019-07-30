/* Gets the country name,
   from the LocalStorage and passing that CountryName to getCountryDetails() function */
function getCountryName() {
    var country = localStorage.getItem('CountryNames');
    getCountryDetails(country);
    countryName.innerHTML = `<div id="countryHeader" style="color: white; font-size: 30px; margin-top: 25px; margin-left: 55px;">${country}</div>`;
}

/* Passing the Country Name from the LocalStorage,
   and using the another API(FULL TEXT),
   to get all the details from it. */
function getCountryDetails(country) {
    var getCountryUrl = fetch('https://restcountries.eu/rest/v2/name/' + country + '?fullText=true');
    getCountryUrl.then(response => {
        return response.json();
    }).then(details => {
        // Insert the HTML code, that are been called from the API
        countryDetails.innerHTML = tableHTML(details);
    });
}

/* Passing the list of data to this function and getting a single country data,
   and performing Table population,
   to get to know the details of that country. */
function tableHTML(details) {
    var selectedCountryDetails = details[0];
    var abbrNums = abbrNum(selectedCountryDetails.population, 2);

    /*countryHeader.innerHTML = "<img src=`${selectedCountryDetails.flag}`>";
    console.log(countryHeader.innerHTML);*/
    /* Statically adding table rows to view the details of country */
    var countryDetailTable =  ('<table id="country-table" style="font-size: 20px; ' +
                                                                'display: table; ' +
                                                                'border-collapse: separate; ' +
                                                                'width: 500px">');

    countryDetailTable += ('<tbody>');

    // Fetching the
    countryDetailTable += (`<tr>
                            <th style="padding: 15px">Name</th>
                            <td style="padding: 15px; color: #424242">${selectedCountryDetails.name}</td>
                            </tr>`);

    countryDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px;">Code</th>
                            <td style="padding: 15px;  color: #424242">${selectedCountryDetails.alpha2Code}</td>
                            </tr>`);

    countryDetailTable += (`<tr>
                            <th style="padding: 15px">Capital</th>
                            <td style="padding: 15px; color: #424242">${selectedCountryDetails.capital}</td>
                            </tr>`);

    countryDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px;">Region</th>
                            <td style="padding: 15px;  color: #424242">${selectedCountryDetails.region}</td>
                            </tr>`);

    countryDetailTable += (`<tr>
                            <th style="padding: 15px">Population</th>
                            <td style="padding: 15px; color: #424242">${abbrNums}</td>
                            </tr>`);

    countryDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px">Timezone</th>
                            <td style="padding: 15px;  color: #424242">${selectedCountryDetails.timezones[0]}</td>
                            </tr>`);

    countryDetailTable += (`<tr>
                            <th style="padding: 15px">Currency</th>
                            <td style="padding: 15px;  color: #424242">${selectedCountryDetails.currencies[0].symbol} ${selectedCountryDetails.currencies[0].code}</td>
                            </tr>`);

    countryDetailTable += (`<tr style="background-color: #90caf9;">
                            <th style="padding: 15px">Language</th>
                            <td style="padding: 15px;  color: #424242">${selectedCountryDetails.languages[0].name}</td>
                            </tr>`);

    countryDetailTable += (`<tr>
                            <th style="padding: 15px">Calling Code</th>
                            <td style="padding: 15px;  color: #424242; font-weight: 100">+${selectedCountryDetails.callingCodes[0]}</td>
                            </tr>`);

    countryDetailTable += ('</tbody>');
    countryDetailTable += ('</table>');
    return countryDetailTable;
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

// Calling the function, to invoke the Country Name in the Div Tag
getCountryName();
