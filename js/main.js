import { fetchWeatherDate } from './api.js';

document.getElementById('weather-form').addEventListener('submit', async(e) => {
  e.preventDefault();
  const cityCode = document.getElementById('city-code').value;

// fetchはネットワークエラーの時だけcatchで捕まえられる。
// 400, 500系のエラーはcatchで捕まえられないので注意。
// とりあえず、catchで捕まえる方法考える

  try {
    const weatherData = await fetchWeatherDate(cityCode)
    console.log(weatherData);
  } catch (error) {
    console.log('失敗したぜおら');
    console.log(error);
  }
})
