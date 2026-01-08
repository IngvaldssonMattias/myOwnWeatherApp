import { getWeatherFromCity } from "./services/services.js";
import { saveSearch } from "./utils/utils.js";
import { renderClock, renderHistory } from "./components/component.js";
import { initSearchUI } from "./components/search.js";
import { celsiusToFahrenheit } from "./utils/temperature.js";
import { searchWeather } from "./components/weatherSearch.js";
import { initTemperatureToggle } from "./components/temperatureToggle.js";
import { initPlaceholder } from "./components/searchPlaceholder.js";

const searchButton = document.getElementById("field-button");
const searchField = document.getElementById("search-field");
const tempElement = document.getElementById("temp");
const unitElement = document.getElementById("unit");
const toggleSwitch = document.getElementById("unitSwitch");
const themeToggleButton = document.querySelector(".themeToggle");
const toggleScale = document.getElementById("toggle-scale");
const root = document.documentElement;

let currentTempCelsius = null; // sparar den temperatur som API:et returnerar i Celsius
initTemperatureToggle(toggleSwitch, tempElement, unitElement, toggleScale, () => currentTempCelsius);

// uppdaterar currentTempCelsius;
searchWeather(searchButton, searchField, tempElement, unitElement, (temp) => currentTempCelsius = temp);
initPlaceholder(searchField);


const savedTheme = localStorage.getItem("preferred-theme");

if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
} else {
  root.removeAttribute("data-theme");
}

updateButtonLabel();

function isDarkMode() {
  return root.getAttribute("data-theme") === "dark";
}

function updateButtonLabel() {
  if (isDarkMode()) {
    themeToggleButton.textContent = " 🔆 ";
  } else {
    themeToggleButton.textContent = " 🌙 ";
  }
}

themeToggleButton.addEventListener("click", () => {
  const nextTheme = isDarkMode() ? "light" : "dark";

  if (nextTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }

  updateButtonLabel();
  localStorage.setItem("preferred-theme", nextTheme);

  themeToggleButton.classList.add("rotate");
  setTimeout(() => {
    themeToggleButton.classList.remove("rotate");
  }, 300);
});

initSearchUI(async (city) => {
  const weather = await getWeatherFromCity(city);

  currentTempCelsius = weather.temperature;
  tempElement.textContent = currentTempCelsius;
  unitElement.textContent = "°C";
  document.getElementById("weather").textContent = weather.weather;
  document.getElementById("location").textContent = weather.city;

  saveSearch(city, weather.temperature);
  renderHistory();
  renderClock();

  searchField.value = "";
});
