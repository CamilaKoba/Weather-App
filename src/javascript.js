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

  let minTemperature = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#min");
  min.innerHTML = minTemperature;

  let maxTemperature = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#max");
  max.innerHTML = maxTemperature;

  let temperatureFeelsLike = Math.round(response.data.main.feels_like);
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
}
function displayCelsius(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahreinheit = document.querySelector("#fahreinheit");
fahreinheit.addEventListener("click", displayFahreinheit);

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

searchCity("Santiago");