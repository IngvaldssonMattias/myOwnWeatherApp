import { getWeatherFromCity } from "./services/services.js";
import { saveSearch } from "./utils/utils.js";
import { renderClock, renderHistory } from "./components/component.js";
import { initSearchUI } from "./components/search.js";
import { celsiusToFahrenheit } from "./utils/temperature.js";
import { searchWeather } from "./components/weatherSearch.js";
import { initTemperatureToggle } from "./components/temperatureToggle.js";
import { initPlaceholder } from "./components/searchPlaceholder.js";
import { initThemeToggle } from "./components/themeToggle.js";

const searchButton = document.getElementById("field-button");
const searchField = document.getElementById("search-field");
const tempElement = document.getElementById("temp");
const unitElement = document.getElementById("unit");
const toggleSwitch = document.getElementById("unitSwitch");
const themeToggleButton = document.querySelector(".themeToggle");
const toggleScale = document.getElementById("toggle-scale");
const root = document.documentElement;

let currentTempCelsius = null; // sparar den temperatur som API:et returnerar i Celsius
initTemperatureToggle(
  toggleSwitch,
  tempElement,
  unitElement,
  toggleScale,
  () => currentTempCelsius
);

// uppdaterar currentTempCelsius;
searchWeather(
  searchButton,
  searchField,
  tempElement,
  unitElement,
  (temp) => (currentTempCelsius = temp)
);
initPlaceholder(searchField);

initThemeToggle(themeToggleButton, root);

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

  searchField.value = "Sök efter en stad";
});
