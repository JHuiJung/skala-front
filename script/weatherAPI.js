const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(lat, lon) {
    const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;
    const response = await fetch(url);
    const data = await response.json();

    return {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m
    };
}
