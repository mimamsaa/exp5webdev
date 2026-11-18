
const apiKey = "5e3d7d6ad5306c647ccab5f9e54bdc51";

async function getWeather() {

    let city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );

        let data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid API key or API key not activated!");
            }
            if (response.status === 404) {
                throw new Error("City not found!");
            }
            throw new Error("Unable to fetch weather!");
        }

        let temperature = data.main.temp;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let condition = data.weather[0].description;
        let icon = data.weather[0].icon;
        let cityName = data.name;

        document.getElementById("result").innerHTML = `
            <h2>${cityName}, ${data.sys.country}</h2>

            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

            <h1>${temperature} °C</h1>

            <p>${condition}</p>

            <p>Humidity: ${humidity}%</p>

            <p>Wind Speed: ${wind} m/s</p>
        `;

    }

    catch (error) {

        document.getElementById("result").innerHTML =
            `<p>${error.message}</p>`;

    }
}

document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
