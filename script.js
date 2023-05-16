// Constants
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

// DOM Elements
const toggleMode = document.getElementById('toggle-mode');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const forecastContainer = document.getElementById('forecast-container');

// Event listeners
toggleMode.addEventListener('change', toggleDarkMode);
searchBtn.addEventListener('click', searchWeather);

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Search weather for a city
function searchWeather() {
  const city = searchInput.value.trim();
  if (city !== '') {
    getWeather(city)
      .then(data => {
        displayForecast(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// Fetch weather data from API
async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Weather data not available');
  }
}

// Display forecast cards
function displayForecast(data) {
  forecastContainer.innerHTML = '';

  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const date = new Date(forecast.dt_txt);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    const card = document.createElement('div');
    card.classList.add('card');

    const dateElement = document.createElement('h2');
    dateElement.textContent = dayOfWeek;

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${forecast.main.temp}°C`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${forecast.weather[0].description}`;

    card.appendChild(dateElement);
    card.appendChild(temperatureElement);
    card.appendChild(descriptionElement);

    forecastContainer.appendChild(card);
  }
}
