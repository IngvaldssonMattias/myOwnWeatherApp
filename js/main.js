import { getWeatherFromCity} from "./services/services.js"; // importerar funktionen från services.js

const searchButton = document.getElementById('search-button'); // skapar variabel searchButton och hämtar det från id i HTML
const searchField = document.getElementById('search-field'); // skapar variabel searchField och hämtar det från id i HTML
const weatherResult = document.getElementById('display-text'); // skapar variabel weatherResult och hämtar det från id i HTML

searchButton.addEventListener('click', async () => { // Lägger till en 'click'-eventlistener på searchButton
    const city = searchField.value; // hämtar det användaren har skrivit in i sökfältet
    console.log(`Söker väder för stad: ${city}`);
    const weather = await getWeatherFromCity(city)

   return weatherResult.innerHTML = `<p>Today at ${weather.time} ${weather.timeZone} in ${weather.city[0].toUpperCase() + weather.city.slice(1).toLowerCase()} the temperature is ${weather.temperature} degrees celsius and the weather is ${weather.weather.toLowerCase()}.</p>`;

});