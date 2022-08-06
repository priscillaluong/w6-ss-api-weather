var submitButton = document.querySelector("#search-form");
var cardEl = document.querySelector("#card-section");
var searchHistoryEl = document.querySelector(".search-history");
var savedSearch = [];
// get weather api url using fetch() .then() methods

function saveSearch(lat, lon, name) {
    var latestSearch = {
        city: name,
        latitude: lat,
        longitude: lon,
    };
    savedSearch.push(latestSearch);
    localStorage.setItem("searches", JSON.stringify(savedSearch));
    //create new button for search
    var newBtn = document.createElement("button");
    newBtn.classList.add('btn', 'btn-light', 'btn-block', 'my-2');
    newBtn.setAttribute('type', 'button');
    newBtn.textContent = name;
    searchHistoryEl.appendChild(newBtn);
}

function getPreviousSearch (){
    event.preventDefault();

}

function getFutureForecast (lat, lon) {
    var futureForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=8d2766b941018d7a3ac5440bf33f1fc2';
    console.log(futureForecastUrl);
    fetch(futureForecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //clear old search result
        cardEl.innerHTML = "";
        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes("12:00:00")) {
                var card = document.createElement('div');
                card.classList.add('card', 'col', 'mx-2');
                cardEl.append(card);
                // display date result
                var dateEl = document.createElement('h2');
                var dateResult = JSON.stringify(new Date(data.list[i].dt * 1000));
                var futureDate = dateResult.slice(1,11);
                dateEl.textContent = futureDate;
                card.append(dateEl);
                //display temp result
                var futureTempEl = document.createElement('p');
                var futureTempResult = data.list[i].main.temp;
                futureTempEl.textContent = "Temp: " + futureTempResult;
                card.append(futureTempEl);
                //display wind result
                var futureWindEl = document.createElement('p');
                var futureWindResult = data.list[i].wind.speed;
                futureWindEl.textContent = "Wind: " + futureWindResult;
                card.append(futureWindEl);
                //display humidity result
                var futureHumidityEl = document.createElement('p');
                var futureHumidityResult = data.list[i].main.humidity;
                futureHumidityEl.textContent = "Humidity: " + futureHumidityResult;
                card.append(futureHumidityEl);
            }
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
        saveSearch(lat, lon, name);
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