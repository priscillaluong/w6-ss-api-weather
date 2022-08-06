var submitButton = document.querySelector("#search-form");

// get weather api url using fetch() .then() methods

/* var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8d2766b941018d7a3ac5440bf33f1fc2';
var url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=8d2766b941018d7a3ac5440bf33f1fc2';
console.log(requestUrl);
console.log(url);
 */
function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8d2766b941018d7a3ac5440bf33f1fc2';
    console.log(requestUrl);
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Use the console to examine the response
        console.log(data);
        // TODO: Loop through the data and generate your HTML
/*         for (var i = 0; i < data.length; i++) {
          var login = document.createElement('h3');
          var url = document.createElement('p');
          login.textContent = data[i].login;
          url.textContent = data[i].url;
          userContainer.append(login);
          userContainer.append(url);
        } */
      });
  }

function searchFormSubmit() {
    event.preventDefault();

    var searchInput = document.querySelector("#search-input").value;

    if (!searchInput) {
        console.error("You need a search input value");
        return;
    }

    getApi(searchInput);
}

submitButton.addEventListener('submit', searchFormSubmit);