import {getIcon} from './modules/icon.js';
import {toCelsius} from './modules/helpers.js';
import {toKmh} from './modules/helpers.js';
import {getImageUrl} from './modules/helpers.js';
import {getTimezone} from './modules/timezone.js';

const App = (() => {
    //DOM
    const containerEl = document.querySelector('.container');
    const tempIcon = document.querySelector('.weather-temp-icon')
    const tempEl = document.querySelector('.weather-temp');
    const cityEl = document.querySelector('.city');
    const countryEl = document.querySelector('.country');
    const timezoneEl = document.querySelector('.timezone');
    const weatherEl = document.querySelector('.weather');
    const humidityEl = document.querySelector('.humidity');
    const windEl = document.querySelector('.wind');
    const searchFormEl = document.querySelector('.search-form');
    const searchEl = document.querySelector('#search');
    const errorMessageEl = document.querySelector('.error-message');
    //API
    const API_KEY = '97d38a2a2be5d12785fe434a802ee283';
    const API_ENDPOINT = 'http://api.openweathermap.org';

    //displays error message
    const errorMessage = () => {
        errorMessageEl.classList.add('show');
        setTimeout(() => {
            errorMessageEl.classList.remove('show');
        }, 2500);
    };

    const getWeather = async (city) => {
        const response = await fetch(`${API_ENDPOINT}/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
        //storing wanted data
        if(response.ok) {
            const weatherObj = await response.json();
            const weather = {
                temperature: toCelsius(weatherObj.main.temp),
                city: weatherObj.name,
                country: weatherObj.sys.country,
                timezone: getTimezone(weatherObj.timezone),
                weather: weatherObj.weather[0].main,
                humidity: weatherObj.main.humidity,
                wind: toKmh(weatherObj.wind.speed),
            }
            return weather;
        }
        else errorMessage();
    }

    const setData = (obj) => {
        tempIcon.innerHTML = getIcon(obj.timezone, obj.weather);
        tempEl.innerHTML = obj.temperature;
        cityEl.innerHTML = `${obj.city}`;
        countryEl.innerHTML = `,${obj.country}`;
        timezoneEl.innerHTML = obj.timezone;
        weatherEl.innerHTML = obj.weather;
        humidityEl.innerHTML = `${obj.humidity}%`;
        windEl.innerHTML = `${obj.wind}km/h`;
        containerEl.style.background = getImageUrl(obj.timezone, obj.weather);
    } 
        
    const listeners = () => {
        searchFormEl.addEventListener('submit', event => {
            event.preventDefault();
            if(searchEl.value.trim()) {
                getWeather(searchEl.value)
                    .then(weather => {
                        setData(weather);
                    });
                searchEl.value = '';
            };
        })

        window.addEventListener('load', () => {
            getWeather('Chimbote')
                .then(weather => {
                    setData(weather);
                });
        })
    };

    return {
        listeners
    }

})();

App.listeners();