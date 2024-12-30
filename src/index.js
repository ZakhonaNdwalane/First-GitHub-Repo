function fetchWeather(city) {
  const apikey = "c4d9be47o0b370b37f28te5a42babf6c";
  const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`; // API URL

  axios
    .get(apiURL)
    .then((response) => {
      displayWeather(response.data);
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
      alert(
        "Unable to fetch weather data. Please check the city name or try again later."
      );
    });
}

function displayWeather(data) {
  let cityElement = document.querySelector("#current-city");
  let temperatureValueElement = document.querySelector(
    ".current-temperature-value"
  );
  let descriptionElement = document.querySelector(".current-details");

  cityElement.innerHTML = data.city;
  temperatureValueElement.innerHTML = Math.round(data.temperature.current); // Display temperature
  descriptionElement.innerHTML = `
    ${data.condition.description} <br />
    Humidity: <strong>${data.temperature.humidity}%</strong>, 
    Wind: <strong>${data.wind.speed} km/h</strong>
  `;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
