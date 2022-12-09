let timeElement = document.querySelector(".time-date");
let now = new Date();
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0{hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0{minutes}`;
}
timeElement.innerHTML = `${day} ${hours}:${minutes}`;
function showTemperature(response) {
  console.log(response.data.temperature);
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels-like");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);
}

let apiKey = "823db6e133aat4d41o6f0ce4dc3ba6ce";
let city = "New York";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
