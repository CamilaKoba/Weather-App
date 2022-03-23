let now = new Date();

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
let rightNow = `${currentDay} | ${currentHour}:${currentMinute}`;

let currentDate = document.querySelector("h2");
currentDate.innerHTML = rightNow;

function showTemperature(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = cityName;

  let temperature = Math.round(response.data.main.temp);
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

//Current Button
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
