
function formatDate(date) {
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = now.getMinutes();
 if (minutes < 10) {
    minutes = `0${minutes}`;
  }

let daysIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = daysIndex[now.getDay()];

return `${day} ${hours}:${minutes}`;
};

function searchCity(city) {
  let apiKey = "0d8a4461749ad27853c25b2011d4ab40";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
};

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city)
}

function showWeather(response) {
  let iconElement = document.querySelector("#current-icon");

  celsuisTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = Math.round(celsuisTemperature);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-weather-description").innerHTML =  response.data.weather[0].main;
  document.querySelector("#current-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#current-wind-speed").innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function searchCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = `metric`;
  let apiKey = "0d8a4461749ad27853c25b2011d4ab40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showPosition(event) {
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsuisTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
};

function showCelsuisTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsuisTemperature);
  celsuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsuisTemperature = null;

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML =  formatDate(now);

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsuisLink = document.querySelector("#celsuis-link");
celsuisLink.addEventListener("click", showCelsuisTemperature);

searchCity("London");


