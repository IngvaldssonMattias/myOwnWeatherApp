import { getWeatherFromCity } from "../services/services.js";

export function renderHistory() {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  let container = document.getElementById("historySidebar");

  container.innerHTML = "<h3>Sökningar</h3>";

  history.forEach((entry) => {
    let item = document.createElement("div");
    item.className = "history-item";
    item.textContent = `${entry.city} – ${entry.temperature}°C`;

    item.addEventListener("click", async () => {
      const weather = await getWeatherFromCity(entry.city);

      document.getElementById("temp").textContent = weather.temperature;
      document.getElementById("unit").textContent = "°C";
      document.getElementById("weather").textContent = weather.weather;
      document.getElementById("location").textContent = weather.city;
    });

    container.appendChild(item);
  });
}
