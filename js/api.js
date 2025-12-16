export function setupWeatherForm() {
  document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cityCode = document.getElementById('city-code').value;
    window.location.href = `https://weather.tsukumijima.net/api/forecast/city/${cityCode}`;
  });
}
