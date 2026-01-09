import { getWeatherFromCity } from "../services/services.js";
import { saveSearch } from "../utils/utils.js";
import { renderClock, renderHistory } from "../components/component.js";

let currentTempCelsius = null; // sparar den temperatur som API:et returnerar i Celsius

export function searchWeather(
  searchButton,
  searchField,
  tempElement,
  unitElement
) {
  searchButton.addEventListener("click", async () => {
    const city = searchField.value.trim();
    if (!city) return;

    const weather = await getWeatherFromCity(city);

    currentTempCelsius = weather.temperature;
    tempElement.textContent = currentTempCelsius;
    unitElement.textContent = "°C";
    document.getElementById("weather").textContent = weather.weather;
    document.getElementById("location").textContent = weather.city;

    // Spara stad + temperatur korrekt
    saveSearch(city, weather.temperature);
    renderHistory();
    renderClock();

    // Rensa inputfält och återställ placeholder
    searchField.value = "";
    searchField.placeholder = "Sök efter en stad";
  });
}
