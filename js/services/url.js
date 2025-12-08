export function createCordinatesURL(city) {
  return `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&format=json`;
}

export function createTemperatureURL(lat, lon) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
}

// export function createCordinatesURL(city) {
//    return `http://kontoret.onvo.se:10380/api/v1/geo?city=Stockholm`
// }

// export function createTemperatureURL(lat, lon){
//     return `http://kontoret.onvo.se:10380/api/v1/weather?lat=59.3293&lon=18.0686`
// }
