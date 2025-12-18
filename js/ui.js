export const displayWeather = (data) => {
  const weatherDiv = document.getElementById('result-content');
  weatherDiv.innerHTML = `
    <h2>Today Weather: ${data.forecasts[0].telop}</h2>
    <h2>Tomorrow Weather: ${data.forecasts[1].telop}</h2>
    <h2>${data.title}</h2>
  `;
}
