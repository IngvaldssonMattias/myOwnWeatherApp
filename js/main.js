
import { getWeatherFromCity } from "./services/services.js";

const searchButton = document.getElementById('search-button');
const searchField = document.getElementById('search-field');
const tempElement = document.getElementById('temp');
const unitElement = document.getElementById('unit');
const toggleSwitch = document.getElementById('unitSwitch');
let currentTempCelsius = null; // sparar den temperatur som API:et returnerar i Celsius

// Funktion för Celsius → Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5 + 32).toFixed(1);
}

// När man klickar på sökknappen
searchButton.addEventListener('click', async () => {
    const city = searchField.value;
    const weather = await getWeatherFromCity(city);

    currentTempCelsius = weather.temperature; // spara i Celsius
    tempElement.textContent = currentTempCelsius;
    unitElement.textContent = "°C";
    document.getElementById("weather").textContent = weather.weather;
    document.getElementById("location").textContent = weather.city;
});

// Lyssna på toggle-switch
toggleSwitch.addEventListener('change', () => {
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
