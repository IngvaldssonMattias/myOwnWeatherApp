import { createCordinatesURL, createTemperatureURL } from "./url.js"; 
import { weatherCodes } from "./weatherCodes.js"; 

export async function getWeatherFromCity(city) {
  // Exporterar en asynkron funktion som hämtar väderdata för en specifik stad
  const response = await fetch(createCordinatesURL(city)); // Skickar en HTTP-förfrågan till API:et för att få koordinater för staden
  if (!response.ok)
    // kontrollerar om HTTP-svaret är ok
    throw new Error(console.log("You got an HTTP-error", response.status)); // om svaret inte är ok, skriv ut You got an HTTP-error.
  const data = await response.json(); // om svaret ör ok så blir det till json

  let latitude = data.results[0].latitude; // hämtar lat från api:et
  let longitude = data.results[0].longitude; // hämtar lon från api:et

  return await getTemperature(latitude, longitude, city); //returnerar lat, lon, city
}

async function getTemperature(lat, lon, city) {
  // skapar en asynkron funktion som hämtar temperaturen för givna koordinater
  const response = await fetch(createTemperatureURL(lat, lon)); // Skickar en HTTP-förfrågan till API:et för att få koordinater för koordinaterna
  if (!response.ok)
    // kontrollerar om HTTP-svaret är ok
    throw new Error(console.log("You got an HTTP-error", response.status)); // om svaret inte är ok, skriv ut You got an HTTP-error.
  const data = await response.json(); // om svaret ör ok så blir det till json

  const weatherData = {
    //skapar ett objekt med väderdata
    city: city,
    temperature: data.current.temperature_2m,
    weather: weatherCodes[data.current.weather_code],
    time: data.current.time,
    timeZone: data.timezone,
  };

  return weatherData; // returnerar objektet med väderdatan.
}
