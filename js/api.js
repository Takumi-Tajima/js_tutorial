export const fetchWeatherDate = (cityCode) => {
  const apiUrl = `https://weather.tsukumijima.net/api/forecast/city/${cityCode}`;
  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then((data) => data);
}

// export function setupWeatherForm() {
//   document.getElementById('weather-form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const cityCode = document.getElementById('city-code').value;
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       const resultContent = document.getElementById('result-content');
//       resultContent.innerHTML = '';
//       const weatherDiv = document.createElement('div');
//       weatherDiv.innerHTML = `
//         <h2>天気予報: ${data.location.city} (${data.location.prefecture})</h2>
//         <p>今日の天気: ${data.forecasts[0].telop}</p>
//         <p>明日の天気: ${data.forecasts[1].telop}</p>
//         <p>明後日の天気: ${data.forecasts[2].telop}</p>
//       `;
//       resultContent.appendChild(weatherDiv);
//     }
//   );
//   });
// }
