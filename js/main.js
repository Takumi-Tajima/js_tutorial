import { fetchWeatherDate } from './api.js';

document.getElementById('weather-form').addEventListener('submit', async(e) => {
  e.preventDefault();
  const cityCode = document.getElementById('city-code').value;
  const weatherData = await fetchWeatherDate(cityCode)
  console.log(weatherData);
})
