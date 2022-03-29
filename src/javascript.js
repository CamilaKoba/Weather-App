function formatDate(timestamp){
let now = new Date(timestamp);

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
return `${currentDay} | ${currentHour}:${currentMinute}`;
}

function forecastWeekday (timestamp){
    let now = new Date(timestamp);
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ];
      let currentDay = days[now.getDay()];
return `${currentDay}`;
}

function displayForecast(response) {
    let dailyForecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  
    let forecastHTML = `<div class="row m-1">`;
    dailyForecast.forEach(function (forecastDay, index) {
        if (index < 5){
      forecastHTML =
        forecastHTML +
        `
        <div class="col border rounded m-1 shadow-sm weekly-card">
        <strong>${forecastWeekday(forecastDay.dt * 1000)}</strong><br /><img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="Sunny" width="90px">
        <br />${Math.round(forecastDay.temp.min)}° | ${Math.round(forecastDay.temp.max)}°
      </div>
    `;}
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates){
      console.log(coordinates);
      let apiKey = "8492ffe2189991cafb005196b47eaa96";
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
    }

function showTemperature(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = cityName;

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;

  let weatherDescription = response.data.weather[0].description;
  let conditions = document.querySelector("#conditions");
  conditions.innerHTML = weatherDescription;

celsiusMinTemperature =response.data.main.temp_min;

  let minTemperature = Math.round(celsiusMinTemperature);
  let min = document.querySelector("#min");
  min.innerHTML = minTemperature;

celsiusMaxTemperature = response.data.main.temp_max;

  let maxTemperature = Math.round(celsiusMaxTemperature);
  let max = document.querySelector("#max");
  max.innerHTML = maxTemperature;

  celsiusFeelsLike = response.data.main.feels_like;

  let temperatureFeelsLike = Math.round(celsiusFeelsLike);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = temperatureFeelsLike;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#windspeed")
  currentWindSpeed.innerHTML = Math.round(windSpeed);

  let weatherIcon = document.querySelector("#main-weather-icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8492ffe2189991cafb005196b47eaa96`;
  axios.get(url).then(showTemperature);
}
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitCity);

function searchLocation(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=8492ffe2189991cafb005196b47eaa96`;
  axios.get(url).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahreinheit(event){
    event.preventDefault();
    let fahreinheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = fahreinheitTemperature;

    let fahreinheitMinTemperature = Math.round((celsiusMinTemperature * 9) / 5 + 32);
    let min = document.querySelector("#min");
    min.innerHTML = fahreinheitMinTemperature;

    let fahreinheitMaxTemperature = Math.round((celsiusMaxTemperature * 9) / 5 + 32);
    let max = document.querySelector("#max");
    max.innerHTML = fahreinheitMaxTemperature;

    let fahreinheitFeelsLike = Math.round((celsiusFeelsLike * 9) / 5 + 32);
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = fahreinheitFeelsLike;
}
function displayCelsius(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    let min = document.querySelector("#min");
    min.innerHTML = Math.round(celsiusMinTemperature);

    let max = document.querySelector("#max");
    max.innerHTML = Math.round(celsiusMaxTemperature);

    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = Math.round(celsiusFeelsLike);
}

let fahreinheit = document.querySelector("#fahreinheit");
fahreinheit.addEventListener("click", displayFahreinheit);

let celsiusTemperature = null;
let celsiusMinTemperature = null;
let celsiusMaxTemperature = null;
let celsiusFeelsLike = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

searchCity("Santiago");