var cityName = document.querySelector("#city-input")
var sumbitElement = document.querySelector("#submit-button")
var titleElement = document.querySelector(".display-4")
var searchHistory = document.querySelector("#searchHistory")
var locationArray = [];
var weekDay = moment().format("dddd LL");
var searches = [];
var searchesHistory = []


function loadSearchHistory() {
  if (localStorage.Searches) {
    searchesHistory = JSON.parse(localStorage.Searches);
  }
  searchesHistory.map(el => {
    var searchLi = document.createElement("li")
    searchLi.textContent = el
    searchHistory.append(searchLi)
  })
}
loadSearchHistory()

function getStorageData(city) {
  if (localStorage.Searches) {
    searches = JSON.parse(localStorage.Searches);
  }
  searches.push(city)
  localStorage.Searches = JSON.stringify(searches);
}



function getLocation(event) {
    var citySearch = cityName.value
    
    var apiKey = '15a0cfa8b9ac3c7368330806d461355d'
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`
    getStorageData(cityName.value)
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        locationArray.push(new Location(data.coord.lat,data.coord.lon))
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
        if(data.daily[0].uvi < 2) {
          document.querySelector("#today-UV").style.backgroundColor = "green"
        }
        if (data.daily[0].uvi <= 5 && data.daily[0].uvi > 2) {
          document.querySelector("#today-UV").style.backgroundColor = "yellow"
        }
        if (data.daily[0].uvi <= 7 && data.daily[0].uvi > 5) {
          document.querySelector("#today-UV").style.backgroundColor = "orange"
        }
        if (data.daily[0].uvi <= 10 && data.daily[0].uvi > 7) {
          document.querySelector("#today-UV").style.backgroundColor = "red"
        }
        if (data.daily[0].uvi >= 11) {
          document.querySelector("#today-UV").style.backgroundColor = "purple"
        }

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