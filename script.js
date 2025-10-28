const button = document.getElementById("search-btn");
const input = document.getElementById("input-city");
const city = document.getElementById("city-name");
const time = document.getElementById("tim");
const temp = document.getElementById("tem");

// ✅ Proper error handling + HTTPS URL
async function getData(cityName) {
    try {
        const promise = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=93aa1d6897d349978dc172815243108&q=${cityName}&aqi=yes`
        );
        return await promise.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim();
    
    if (!value) {
        alert("Please enter a city name");
        return;
    }

    // Show loading spinner
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    const result = await getData(value);

    // Reset button
    button.innerHTML = '<i class="fas fa-search"></i>';
    button.disabled = false;

    if (result && result.location) {
        city.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        
        // Format local time
        const date = new Date(result.location.localtime);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        time.innerText = date.toLocaleTimeString('en-US', options);
        
        temp.innerText = `${result.current.temp_c}°C`;

        // Update icons + details
        updateWeatherIcon(result.current.condition.code);
        updateWeatherDetails(result);
    } else {
        alert("City not found. Please try again.");
    }
});

// ✅ Update weather icon based on condition code
function updateWeatherIcon(conditionCode) {
    const iconElement = document.querySelector('.weather-icon i');
    iconElement.className = '';

    if (conditionCode === 1000) {
        iconElement.className = 'fas fa-sun';
    } else if (conditionCode >= 1003 && conditionCode <= 1009) {
        iconElement.className = 'fas fa-cloud';
    } else if (conditionCode >= 1030 && conditionCode <= 1087) {
        iconElement.className = 'fas fa-cloud-rain';
    } else if (conditionCode >= 1114 && conditionCode <= 1117) {
        iconElement.className = 'fas fa-snowflake';
    } else if (conditionCode >= 1135 && conditionCode <= 1147) {
        iconElement.className = 'fas fa-smog';
    } else {
        iconElement.className = 'fas fa-cloud-sun';
    }
}

// ✅ Update weather details
function updateWeatherDetails(result) {
    const feelsLike = document.querySelector('.weather-details .detail:nth-child(1) .value');
    const humidity = document.querySelector('.weather-details .detail:nth-child(2) .value');
    const wind = document.querySelector('.weather-details .detail:nth-child(3) .value');

    if (feelsLike && humidity && wind) {
        feelsLike.textContent = `${result.current.feelslike_c}°C`;
        humidity.textContent = `${result.current.humidity}%`;
        wind.textContent = `${result.current.wind_kph} km/h`;
    }
}

// ✅ Allow Enter key search
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        button.click();
    }
});
