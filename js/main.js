import { getWeatherFromCity } from "./services/services.js";

const searchButton = document.getElementById('search-button');
const searchField = document.getElementById('search-field');
const weatherResult = document.getElementById('display-text');

searchButton.addEventListener('click', async () => {

    const city = searchField.value;
    const weather = await getWeatherFromCity(city);

    document.getElementById("temp").textContent = weather.temperature;
    document.getElementById("unit").textContent = "°C";
    document.getElementById("weather").textContent = weather.weather;
    document.getElementById("location").textContent = weather.city;
  


    // weatherResult.innerHTML = `
    //     <p>Today at ${weather.time} ${weather.timeZone} in 
    //     ${weather.city[0].toUpperCase() + weather.city.slice(1).toLowerCase()} 
    //     the temperature is ${weather.temperature} degrees celsius 
    //     and the weather is ${weather.weather.toLowerCase()}.</p>`;
});
