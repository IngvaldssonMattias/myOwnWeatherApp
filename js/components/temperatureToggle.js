import { celsiusToFahrenheit } from "../utils/temperature.js";


// Lyssna på toggle-switch
export function initTemperatureToggle(toggleSwitch, tempElement, unitElement, toggleScale, getCurrentTemp) {
  toggleSwitch.addEventListener("change", () => {
    const currentTempCelsius = getCurrentTemp(); // Hämta aktuell temperatur från main.js
    if (currentTempCelsius === null) return;

    if (toggleSwitch.checked) {
      tempElement.textContent = celsiusToFahrenheit(currentTempCelsius);
      unitElement.textContent = "°F";
      toggleScale.textContent = "Fahrenheit";
    } else {
      tempElement.textContent = currentTempCelsius;
      unitElement.textContent = "°C";
      toggleScale.textContent = "Celsius";
    }
  });
}
