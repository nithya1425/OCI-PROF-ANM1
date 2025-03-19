const apiKey = 'your_openweathermap_api_key'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weather-info');
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');

getWeatherBtn.addEventListener('click', getWeather);

async function getWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        // Extract weather data
        const cityName = data.name;
        const temperature = data.main.temp;
        const condition = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Update the weather information on the page
        document.getElementById('city-name').textContent = `Weather in ${cityName}`;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
        document.getElementById('weather-condition').textContent = `Condition: ${condition}`;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;

        weatherInfo.style.display = 'block';
    } catch (error) {
        alert("Error fetching weather data.");
    }
}
