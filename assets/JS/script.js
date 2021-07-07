var cityName = document.querySelector("#city-input")
var sumbitElement = document.querySelector("#submit-button")
var titleElement = document.querySelector(".display-4")
var locationArray = [];
var weekDay = moment().format("dddd LL");
var searches;


function localData() {
    if ("cities" in localStorage) {
        searches = JSON.parse(localStorage.getItem('cities'))
        }
}


function getLocation(event) {
    var citySearch = cityName.value
    
    var apiKey = 'a6f4c7c6117b467306e0dda6808a0ae4'
    var requestUrl = `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${citySearch}`;
    
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        locationArray.push(new Location(data.data[0].latitude,data.data[0].longitude))
        getWeather()
    });
}

function Location(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }





function getWeather(event) {
    var apiKey = '15a0cfa8b9ac3c7368330806d461355d'
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationArray[0].lat}&lon=${locationArray[0].lon}&units=imperial&appid=${apiKey}`;
    
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        titleElement.textContent = `${cityName.value} - ${weekDay} `
        document.querySelector("#today-temp").textContent = `Temp: ${data.daily[0].temp.day}`
        document.querySelector("#today-wind").textContent = `Wind: ${data.daily[0].wind_speed}`
        document.querySelector("#today-humitity").textContent = `Humitity: ${data.daily[0].humidity}`
        document.querySelector("#today-UV").textContent = `UV Index: ${data.daily[0].uvi}`

        document.querySelector("#one-title").textContent = moment.unix(data.daily[1].dt).format('l');
        document.querySelector("#one-temp").textContent = `Temp: ${data.daily[1].temp.day}`;
        document.querySelector("#one-wind").textContent = `Wind: ${data.daily[1].wind_speed}`
        document.querySelector("#one-humitity").textContent = `Humitity: ${data.daily[1].humidity}`

        document.querySelector("#two-title").textContent = moment.unix(data.daily[2].dt).format('l');
        document.querySelector("#two-temp").textContent = `Temp: ${data.daily[2].temp.day}`;
        document.querySelector("#two-wind").textContent = `Wind: ${data.daily[2].wind_speed}`
        document.querySelector("#two-humitity").textContent = `Humitity: ${data.daily[2].humidity}`

        document.querySelector("#three-title").textContent = moment.unix(data.daily[3].dt).format('l');
        document.querySelector("#three-temp").textContent = `Temp: ${data.daily[3].temp.day}`;
        document.querySelector("#three-wind").textContent = `Wind: ${data.daily[3].wind_speed}`
        document.querySelector("#three-humitity").textContent = `Humitity: ${data.daily[3].humidity}`

        document.querySelector("#four-title").textContent = moment.unix(data.daily[4].dt).format('l');
        document.querySelector("#four-temp").textContent = `Temp: ${data.daily[4].temp.day}`;
        document.querySelector("#four-wind").textContent = `Wind: ${data.daily[4].wind_speed}`
        document.querySelector("#four-humitity").textContent = `Humitity: ${data.daily[4].humidity}`

        document.querySelector("#five-title").textContent = moment.unix(data.daily[5].dt).format('l');
        document.querySelector("#five-temp").textContent = `Temp: ${data.daily[5].temp.day}`;
        document.querySelector("#five-wind").textContent = `Wind: ${data.daily[5].wind_speed}`
        document.querySelector("#five-humitity").textContent = `Humitity: ${data.daily[5].humidity}`
      });
    }

    sumbitElement.addEventListener("click", getLocation)