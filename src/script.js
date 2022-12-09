function displayTemperature(response) {
  console.log(response.data);
}
let apiKey = "823db6e133aat4d41o6f0ce4dc3ba6ce";
let city = "New York";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.Get(apiUrl).then(displayTemperature);
