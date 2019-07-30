function listOfNames(countries) {
    console.log(countries);
    const names = countries.map(country => `<li>${country.name}</li>`).join("\n");
    return `<ul>${names}</ul>`
}

function searchCountries() {
    var name = document.getElementById('countryName');
    const fetchPromise = fetch("https://restcountries.eu/rest/v2/name/" + name.value);
    fetchPromise.then(response => {
        return response.json();
    }).then(countries => {
        main.innerHTML = cardHTML(countries);
        //main.innerHTML = countriesList(countries);
    }).catch(error => {
        console.log("Error: ", error);
        main.innerHTML = errorAlertHTML();
    })
    ;
}

function cardHTML(countries) {
    var countryCards =  ('<div class="row" style="position: absolute; margin-left: 50px; margin-top: 50px" >');

    countries.forEach(country => {
        countryCards += `<div class="column" style="margin-right: 20px"><div class="card" onclick="setSelectedCountry('${country.name}')"><img src="${country.flag}" alt="flag" style="width:50%; height: 50%">
    <div class="container"><h4><b>${country.name}</b></h4></div></div></div>`;
    });

    countryCards += '</div>';

    console.log("countryCards:", countryCards);
    return countryCards;
}

function errorAlertHTML() {
    var errorMessage = ('<div class="alert alert-error" role="alert">');
    errorMessage +=  ('No search results found!');
    errorMessage += ('</div>');
    return errorMessage;
}

function setSelectedCountry(country) {
    console.log(country);
    localStorage.setItem("CountryNames", country);
    window.location.href = "../../country-details.html";
}

/*function cardHTML(countries) {
    const countryCards = [];
    countryCards.push('<div class="row">');

    countries.forEach(country => {
        countryCards.push(`<div class="column"><div class="card"><img src="${country.flag}" alt="flag" style="width:50%; height: 50%">
    <div class="container"><h4><b>${country.name}</b></h4></div></div></div>`);
    });

    countryCards.push('</div>');

    console.log("countryCards:", countryCards);
    return countryCards;
}*/

/*function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function countriesList(countries) {
    const ul = document.getElementById('countries');
    return countries.map(function(country) {
        let li = createNode('li'),
            img = createNode('img'),
            span = createNode('span');
        img.src = country.flag;
        span.innerHTML = `${country.name}`;
        append(li, img);
        append(li, span);
        append(ul, li);
    })
}*/
