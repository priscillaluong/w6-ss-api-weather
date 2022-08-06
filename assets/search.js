var submitButton = document.querySelector("#search-form");
var cardEl = document.querySelector("#card-section");

// get weather api url using fetch() .then() methods

function getFutureForecast (lat, lon) {
    var futureForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&cnt=5&appid=8d2766b941018d7a3ac5440bf33f1fc2';
    console.log(futureForecastUrl);

    fetch(futureForecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.list.length; i++) {
            var card = document.createElement('div');
            card.classList.add('card', 'col', 'mx-2');
        }
    })

}

function getApi(lat, lon, name) {
// TODO: Loop through the data and generate your HTML
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,daily&appid=8d2766b941018d7a3ac5440bf33f1fc2';
    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var nameDateEl = document.querySelector(".city-name");

        //display city name and date
        var unix_timestamp = data.current.dt;
        console.log(unix_timestamp);
        var date = new Date(unix_timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date. getDate();
        nameDateEl.textContent = name + " (" + day + "/" + month + "/" + year + ")";

        //display temp
        var temp = data.current.temp;
        var tempEl = document.querySelector(".temp");
        tempEl.textContent = "Temp: " + temp;

        //display wind
        var wind = data.current.wind_speed;
        var windEl = document.querySelector(".wind");
        windEl.textContent = "Wind: " + wind;

        //display humidity
        var humidity = data.current.humidity;
        var humidityEl = document.querySelector(".humidity");
        humidityEl.textContent = "Humidity: " + humidity;

        //display UVI
        var uvi = data.current.uvi;
        var uviEl = document.querySelector(".uv-index");
        uviEl.textContent = "UV Index: " + uvi;

    })
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
        var name = location[0].name;
        console.log(lat);
        console.log(lon);
        
        getApi(lat, lon, name);
        getFutureForecast(lat, lon);
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