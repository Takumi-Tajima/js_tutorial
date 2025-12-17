
document.getElementById('weather-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const cityCode = document.getElementById('city-code').value;
  const apiUrl = `https://weather.tsukumijima.net/api/forecast/city/${cityCode}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => { console.log(data.publicTime);}
  );
});
