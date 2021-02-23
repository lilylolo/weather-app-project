let celsuisTemperature = null;
let now = new Date();
let currentDate = document.querySelector("#current-time");
let form = document.querySelector("form");
let currentLocationButton = document.querySelector("#current-location-button");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsuisLink = document.querySelector("#celsuis-link");

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let daysIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = daysIndex[date.getDay()];

  return `${day} ${formatHours(timestamp)}`
};


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
 if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;


 for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];

  forecastElement.innerHTML += `
  <div class="col-3">
    <h4>${formatHours(forecast.dt * 1000)}</h4>  
    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt=""/>
    <div class="forecast-temperature"><strong>${Math.round(forecast.main.temp_max)}°</strong></div> 
  </div>
  `
 }
}

function searchCity(city) {
  let apiKey = "0d8a4461749ad27853c25b2011d4ab40";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`

  axios.get(apiUrl).then(displayForecast);
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
  document.querySelector("#last-updated-date").innerHTML =  `Last updated: ${formatDate(response.data.dt * 1000)}`;

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
  axios.get(apiUrl).then(displayForecast);
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

currentDate.innerHTML =  formatDate(now);

form.addEventListener("submit", handleSubmit);

currentLocationButton.addEventListener("click", showPosition);

fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

celsuisLink.addEventListener("click", showCelsuisTemperature);

searchCity("London");


