var submitButton = document.querySelector("#search-form");
var cardEl = document.querySelector("#card-section");
var searchHistoryEl = document.querySelector(".search-history");
var savedData = JSON.parse(localStorage.getItem("searches")) || [];

// get weather api url using fetch() .then() methods

function init() {
    for (var i = 0; i < savedData.length; i++) {
        var newBtn = document.createElement("button");
        newBtn.classList.add('btn', 'btn-light', 'btn-block', 'my-2');
        newBtn.setAttribute('type', 'button');
        newBtn.textContent = savedData[i].city;
        searchHistoryEl.appendChild(newBtn);
    }
}

function saveSearch(lat, lon, name) {
    var latestSearch = {
        city: name,
        latitude: lat,
        longitude: lon,
    };

    var insertNew = true;

    for (var i = 0; i < savedData.length; i++) {
        console.log(savedData);
        if (savedData[i].city === name) {
            insertNew = false;
            return;
        } else {
            continue;
        }
    }

    if (insertNew === true) {
        console.log(latestSearch.city);
        savedData.push(latestSearch);
        localStorage.setItem("searches", JSON.stringify(savedData));
        //create new button for search
        var newBtn = document.createElement("button");
        newBtn.classList.add('btn', 'btn-light', 'btn-block', 'my-2');
        newBtn.setAttribute('type', 'button');
        newBtn.textContent = name;
        searchHistoryEl.appendChild(newBtn);
    }
}

function getFutureForecast (lat, lon) {
    var futureForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=8d2766b941018d7a3ac5440bf33f1fc2';
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
                card.classList.add('card', 'col', 'mx-1');
                cardEl.append(card);
                // display date result
                var dateEl = document.createElement('h4');
                var dateResult = JSON.stringify(new Date(data.list[i].dt * 1000));
                var futureDate = dateResult.slice(1,11);
                dateEl.textContent = futureDate;
                card.append(dateEl);
                //display icon 
                var img = document.createElement('img');
                var futureIcon = data.list[i].weather[0].icon;
                img.setAttribute('src', 'https://openweathermap.org/img/wn/' + futureIcon + '@2x.png');
                card.append(img);
                //display temp result
                var futureTempEl = document.createElement('p');
                var futureTempResult = data.list[i].main.temp;
                futureTempEl.textContent = "Temp: " + futureTempResult + " °C";
                card.append(futureTempEl);
                //display wind result
                var futureWindEl = document.createElement('p');
                var futureWindResult = data.list[i].wind.speed;
                futureWindEl.textContent = "Wind: " + futureWindResult + " MPH";
                card.append(futureWindEl);
                //display humidity result
                var futureHumidityEl = document.createElement('p');
                var futureHumidityResult = data.list[i].main.humidity;
                futureHumidityEl.textContent = "Humidity: " + futureHumidityResult + " %";
                card.append(futureHumidityEl);
            }
        }
    })
}

function getApi(lat, lon, name) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,daily&units=metric&appid=8d2766b941018d7a3ac5440bf33f1fc2';
    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var nameDateEl = document.querySelector(".city-name");

        //display city name, date and icon
        var unix_timestamp = data.current.dt;
        console.log(unix_timestamp);
        var date = new Date(unix_timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date. getDate();

        var icon = data.current.weather[0].icon;
        console.log(icon);
        nameDateEl.innerHTML = name + " (" + day + "/" + month + "/" + year + ') <img src="https://openweathermap.org/img/wn/' + icon + '@2x.png">';

        //display temp
        var temp = data.current.temp;
        var tempEl = document.querySelector(".temp");
        tempEl.textContent = "Temp: " + temp + " °C";

        //display wind
        var wind = data.current.wind_speed;
        var windEl = document.querySelector(".wind");
        windEl.textContent = "Wind: " + wind + " MPH";

        //display humidity
        var humidity = data.current.humidity;
        var humidityEl = document.querySelector(".humidity");
        humidityEl.textContent = "Humidity: " + humidity + " %";

        //display UVI
        var uvi = data.current.uvi;
        var uviEl = document.querySelector(".uv-index");
        uviEl.innerHTML = "UV Index:  <span>" + uvi + "</span>";
        // change UVI background color depending on figure
        var span = document.querySelector("span");
        if (uvi <= 2) {
            span.style.backgroundColor = '#9cde57';
        } else if (uvi => 3 || uvi <= 5) {
            span.style.backgroundColor = '#f0d351';
        } else if (uvi => 6 || uvi <= 7) {
            span.style.backgroundColor = '#f29f4b';
        } else if (uvi => 8 || uvi <= 10) {
            span.style.backgroundColor = '#ed3e1f';
            span.style.color = 'white';
        } else {
            span.style.backgroundColor = '#cc06b8';
            span.style.color = 'white';
        }

    })
}

function getCoordinates(search) {
    var coordinates = 'https://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=8d2766b941018d7a3ac5440bf33f1fc2';
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

function searchFormSubmit(e) {
    e.preventDefault();

    var searchInput = document.querySelector("#search-input").value;

    if (!searchInput) {
        console.error("You need a search input value");
        return;
    }

    getCoordinates(searchInput);
}

//event listener for dynamic buttons
searchHistoryEl.addEventListener('click', function(x) {
    console.log(x.target.nodeName);
    console.log(x.target);
    console.log(x.target.textContent);
    if (x.target.nodeName === "BUTTON") {
        console.log(savedData);
        getCoordinates(x.target.textContent);
    }
});

submitButton.addEventListener('submit', searchFormSubmit);
init();