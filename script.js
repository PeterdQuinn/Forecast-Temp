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

// Search weather for a location
function searchWeather() {
  const location = searchInput.value.trim();
  if (location !== '') {
    getWeather(location)
      .then(data => {
        displayForecast(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// Fetch weather data from API
async function getWeather(location) {
  const apiKey = '9129O8AdFXPSJB1VGWuEFeHaLQd7xLRa';
  const apiUrl = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&timesteps=1h&units=metric&apikey=${apiKey}`;
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

  const temperatureTimeline = data.data.timelines.temperature;

  for (let i = 0; i < temperatureTimeline.length; i++) {
    const timestamp = temperatureTimeline[i].time;
    const temperature = temperatureTimeline[i].value;

    const date = new Date(timestamp);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    const card = document.createElement('div');
    card.classList.add('card');

    const dateElement = document.createElement('h2');
    dateElement.textContent = dayOfWeek;

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${temperature}°C`;

    card.appendChild(dateElement);
    card.appendChild(temperatureElement);

    forecastContainer.appendChild(card);
  }
}
