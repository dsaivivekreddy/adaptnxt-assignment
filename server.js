const express = require('express');
const app = express();
const port = 3007;
const apiKey = "a04d2a24d68670a8803bcf1659b69faa"

app.use(express.static('public'));
app.use(express.json());

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: 'City name is required' });
    }

    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
        const data =await response.json();
        console.log(data)
        if (data.error) {
            return res.status(404).send({ error: 'City not found' });
        }

        res.send({
            location: data.location.name,
            temperature: data.current.temperature,
            description: data.current.weather_descriptions[0],
            icon: data.current.weather_icons[0],
        });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
