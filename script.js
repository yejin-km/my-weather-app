//api key
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

//get current date
let currentDate = new Date();

let date = document.querySelector("#current-date");

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentTime = date.toLocaleTimeString([], { timeStyle: "short" }); //"short" displays hour and minute

  return `${currentDay} ${currentTime}`;
}
date.innerHTML = formatDate(currentDate);

//display Fahrenheit temperature
function displayFahrenheit(response) {
  let h1 = document.querySelector("h1");

  h1.innerHTML = response.data.name;
  let currentDeg = document.querySelector("#current-deg");
  let temperature = Math.round(response.data.main.temp);
  currentDeg.innerHTML = `${temperature}`;
}

//display city input on page
function displayCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#input-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayFahrenheit);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCity);

//displays current temperature when "current button" is clicked
function currentButton() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
document
  .querySelector("#current-button")
  .addEventListener("click", currentButton);

//get location temperature
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayFahrenheit);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
