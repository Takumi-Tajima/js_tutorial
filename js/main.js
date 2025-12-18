import { fetchWeatherDate } from './api.js';
import { displayWeather } from './ui.js';

document.getElementById('weather-form').addEventListener('submit', async(e) => {
  e.preventDefault();
  const cityCode = document.getElementById('city-code').value;

  try {
    const weatherData = await fetchWeatherDate(cityCode)
    displayWeather(weatherData);
  } catch (error) {
    const undefinedCityData = { name: 'なんもない' };
    displayWeather(undefinedCityData);
  }
})
