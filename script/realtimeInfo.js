import { fetchWeather } from "./weatherAPI.js";

const cities = {
    seoul: { name: "서울", lat: 37.5665, lon: 126.9780 },
    busan: { name: "부산", lat: 35.1796, lon: 129.0756 },
    jeju: { name: "제주", lat: 33.4996, lon: 126.5312 },
    gangneung: { name: "강릉", lat: 37.7519, lon: 128.8761 },
    tokyo: { name: "도쿄", lat: 35.6762, lon: 139.6503 }
};

const citySelect = document.getElementById("city-select");
const weatherBox = document.getElementById("weather-box");

function renderCityInfo(city) {
    return `<p><strong>${city.name}</strong> (위도: ${city.lat}, 경도: ${city.lon})</p>`;
}

async function updateWeather() {
    const city = cities[citySelect.value];

    weatherBox.innerHTML = renderCityInfo(city) + "<p>로딩 중... ⏳</p>";

    const weather = await fetchWeather(city.lat, city.lon);

    weatherBox.innerHTML =
        renderCityInfo(city) +
        `<p>🌡️ 온도: ${weather.temperature}°C</p>` +
        `<p>💧 습도: ${weather.humidity}%</p>`;
}

citySelect.addEventListener("change", updateWeather);
updateWeather();
