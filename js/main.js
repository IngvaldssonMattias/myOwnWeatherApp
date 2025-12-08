import { getWeatherFromCity } from "./services/services.js";
import { saveSearch } from "./utils/utils.js";
import { renderHistory } from "./components/component.js";

const searchButton = document.getElementById("field-button");
const searchField = document.getElementById("search-field");
const tempElement = document.getElementById("temp");
const unitElement = document.getElementById("unit");
const toggleSwitch = document.getElementById("unitSwitch");
const themeToggleButton = document.querySelector(".themeToggle")
const root = document.documentElement;

let currentTempCelsius = null; // sparar den temperatur som API:et returnerar i Celsius

// Funktion för Celsius → Fahrenheit
function celsiusToFahrenheit(celsius) {
  return ((celsius * 9) / 5 + 32).toFixed(1);
}

// När man klickar på sökknappen
searchButton.addEventListener("click", async () => {
  const city = searchField.value;
  const weather = await getWeatherFromCity(city);

  currentTempCelsius = weather.temperature;
  tempElement.textContent = currentTempCelsius;
  unitElement.textContent = "°C";
  document.getElementById("weather").textContent = weather.weather;
  document.getElementById("location").textContent = weather.city;

  // Spara stad + temperatur korrekt
  saveSearch(city, weather.temperature);
  renderHistory();
});

// Lyssna på toggle-switch
toggleSwitch.addEventListener("change", () => {
  if (currentTempCelsius === null) return; // inga temperaturdata än

  if (toggleSwitch.checked) {
    // Byt till Fahrenheit
    tempElement.textContent = celsiusToFahrenheit(currentTempCelsius);
    unitElement.textContent = "°F";
  } else {
    // Byt tillbaka till Celsius
    tempElement.textContent = currentTempCelsius;
    unitElement.textContent = "°C";
  }
});



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
