document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByCoords, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

const apiKey = "a5b0a55e0a7220a910b9015148c40fd1"; // Your OpenWeatherMap API key

function getWeatherByCoords(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
}

function getWeatherByLocation() {
    const location = document.getElementById("location").value;
    if (location) {
        fetchWeatherData(`q=${location}`);
    } else {
        alert("Please enter a location.");
    }
}

function fetchWeatherData(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later.");
        });
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        
    `;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
