const WEATHER_API_KEY = "0b913e4fe33428a7b4fe89f33afb4163";
const WEATHER_LAT = 0.3476;
const WEATHER_LON = 32.5825;

async function getWeather() {
    const current = document.querySelector("#currentWeather");
    const forecast = document.querySelector("#forecast");
    if (!current || !forecast) return;

    if (WEATHER_API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
        current.innerHTML = "<p><strong>API key needed.</strong> Add your OpenWeatherMap API key in <code>scripts/weather.js</code>.</p>";
        forecast.innerHTML = "<p>The three-day forecast will appear after the API key is added.</p>";
        return;
    }

    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`;
        const [currentResponse, forecastResponse] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);
        if (!currentResponse.ok || !forecastResponse.ok) throw new Error("Weather service request failed.");
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        current.innerHTML = `
            <p><strong>${Math.round(currentData.main.temp)}°C</strong></p>
            <p>${currentData.weather[0].description}</p>
            <p>Feels like ${Math.round(currentData.main.feels_like)}°C • Humidity ${currentData.main.humidity}%</p>`;

        const today = new Date();
        const days = [];
        for (let offset = 1; offset <= 3; offset++) {
            const date = new Date(today);
            date.setDate(today.getDate() + offset);
            const key = date.toISOString().slice(0, 10);
            const entries = forecastData.list.filter(item => item.dt_txt.startsWith(key));
            if (entries.length) {
                const midday = entries.find(item => item.dt_txt.includes("12:00:00")) || entries[Math.floor(entries.length / 2)];
                days.push({
                    date,
                    temp: Math.round(midday.main.temp),
                    description: midday.weather[0].description
                });
            }
        }

        forecast.innerHTML = days.map(day => `
            <article class="forecast-day">
                <h4>${day.date.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</h4>
                <p><strong>${day.temp}°C</strong></p>
                <p>${day.description}</p>
            </article>`).join("");
    } catch (error) {
        console.error(error);
        current.innerHTML = "<p>Weather data could not be loaded right now.</p>";
        forecast.innerHTML = "<p>Please try again later.</p>";
    }
}
getWeather();