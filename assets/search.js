var submitButton = document.querySelector("#search-form");

// get weather api url using fetch() .then() methods

/* var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8d2766b941018d7a3ac5440bf33f1fc2';
var url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&appid=8d2766b941018d7a3ac5440bf33f1fc2';
console.log(requestUrl);
console.log(url);
 */

function getApi(lat, lon) {
// TODO: Loop through the data and generate your HTML
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,daily&appid=8d2766b941018d7a3ac5440bf33f1fc2';
    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
    })

    for (var i = 0; i < data.length; i++) {
        var login = document.createElement('h3');
        var url = document.createElement('p');
        login.textContent = data[i].login;
        url.textContent = data[i].url;
        userContainer.append(login);
        userContainer.append(url);
    }
}

function getCoordinates(search) {
    var coordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=8d2766b941018d7a3ac5440bf33f1fc2';
    console.log(coordinates);

    fetch(coordinates)
      .then(function (response) {
        return response.json();
      })
      .then(function (location) {
        console.log(location);

        if (!location.length) {
            console.log("No results found!");
        }

        var lat = location[0].lat;
        var lon = location[0].lon;
        console.log(lat);
        console.log(lon);
        
        getApi(lat, lon);
      });
  }

function searchFormSubmit() {
    event.preventDefault();

    var searchInput = document.querySelector("#search-input").value;

    if (!searchInput) {
        console.error("You need a search input value");
        return;
    }

    getCoordinates(searchInput);
}

submitButton.addEventListener('submit', searchFormSubmit);