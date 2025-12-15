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

export function renderClock(){
  const time = document.getElementById("time");
  if(!time) return;

  function updateClock(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    

    time.textContent = `${hours}:${minutes}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
}