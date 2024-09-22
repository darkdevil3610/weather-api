document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const weatherInfo = document.getElementById('weather-info');

   
    function translateWeatherDescription(description) {
      
        const translations = {
            'clear sky': 'Clear Sky',
            'few clouds': 'Few Clouds',
            'scattered clouds': 'Scattered Clouds',
            'broken clouds': 'Cloudy clouds',
            'shower rain': 'Shower Rain',
            'rain': 'Rain',
            'thunderstorm': 'ThunderStorm',
            'snow': 'Snow',
          'overcast clouds': 'thick cloudy clouds',
            'mist': 'Fog'
        };

        return translations[description] || description;
    }

    weatherForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const locationInput = document.getElementById('location');
        const location = locationInput.value;

        if (!location) {
            alert('Please enter a city.');
            return;
        }

        const apiKey = '88ebd74001f8a6b4e1602371559680d6';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                const { name, weather, main } = data;
                const weatherDescription = translateWeatherDescription(weather[0].description); 
                const temperature = main.temp;

                weatherInfo.innerHTML = `
                    <h2 class="text-xl mb-2">${name}</h2>
                    <p class="text-lg">${weatherDescription}</p>
                    <p class="text-3xl font-semibold">${temperature}°C</p>
                `;
            } else {
                weatherInfo.innerHTML = 'City not found.';
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'An error occurred.';
        }
    });
});

