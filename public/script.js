document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        document.getElementById('weatherInfo').innerHTML = `
            <h2>Weather in ${data.location}</h2>
            <p>Temperature: ${data.temperature}°C</p>
            <p>${data.description}</p>
            <img src="${data.icon}" alt="Weather icon">
        `;
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
    }
});
