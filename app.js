const API_KEY = '97d38a2a2be5d12785fe434a802ee283';
const API_ENDPOINT = 'http://api.openweathermap.org';

const getWeather = async (city_name) => {
    const response = await fetch(`${API_ENDPOINT}/data/2.5/weather?q=${city_name}&APPID=${API_KEY}`);
    const weather = await response.json();

    console.log(weather);
}


getWeather('Lima');