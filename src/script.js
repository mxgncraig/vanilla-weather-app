let timeElement = document.querySelector(".time-date");
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0{hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

timeElement.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels-like");
  let currentIcon = document.querySelector("#current-icon");
  celciusTemp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);
  currentIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <div class="upcoming-forecast-days">${day}</div>
            <div class="upcoming-forecast-icons">
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
                alt=".."
                width="36"
              />
            </div>
            <div class="upcoming-forecast-temps">
              <span class="upcoming-forecast-temps-max">23</span>/<span
                class="upcoming-forecast-temp-min"
                >24</span
              >
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function search(city) {
  let apiKey = "823db6e133aat4d41o6f0ce4dc3ba6ce";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}
function farConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farTemperature = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farTemperature);
  celLink.classList.remove("active");
  farLink.classList.add("active");
}
function celConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
  celLink.classList.add("active");
  farLink.classList.remove("active");
}

let celciusTemp = null;

let farLink = document.querySelector("#far");
farLink.addEventListener("click", farConversion);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", celConversion);

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

search("Brisbane");
displayForecast();
