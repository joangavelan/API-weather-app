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
    //API
    const API_KEY = '97d38a2a2be5d12785fe434a802ee283';
    const API_ENDPOINT = 'http://api.openweathermap.org';

    //helper functions
    //converts temp from kelvin to celsius
    const toCelsius = (num) => Math.round(num - 273.1);
    //converts wind speed from m/s to km/h
    const toKmh = (num) => +((num * 3.6).toFixed(1));
    //discovers if its day or night time based on the hour
    const getTime = (timezone) => {
        const hour = +(timezone.slice(0, 2).replace(':', ''));
        const time = (hour >= 6 && hour <= 19) ? 'day' : 'night';
        return time;
    }
    //gets timezone by seconds
    const getTimezone = (seconds) => {
        const date = new Date();
        const MIN_OFFSET = seconds / 60;
        const setTimezone = (offset) => {
            if(offset >= 0) date.setMinutes(date.getMinutes() + offset);
            else date.setMinutes(date.getMinutes() - Math.abs(offset));
        }
        //setting up UTC timezone
        const UTC_OFFSET = date.getTimezoneOffset();
        setTimezone(UTC_OFFSET);
        //setting up aim city timezone
        setTimezone(MIN_OFFSET);

        const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];

        const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

        //formatting custom timezone
        const hour = date.getHours();
        const min = date.getMinutes();
        const week_day = days[date.getDay()];
        const month_day = date.getDate();  
        const month = months[date.getMonth()].slice(0, 3);
        const year = date.getFullYear().toString().slice(2, 4);

        //custom timezone
        return `${hour}:${min} - ${week_day}, ${month_day} ${month} '${year}`;
    }

    const getWeather = async (city) => {
        const response = await fetch(`${API_ENDPOINT}/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
        const weatherObj = await response.json();
        //storing wanted data
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

    const getIcon = (timezone, weather) => {
        weather = weather.toLowerCase();
        //finding out what time is it to set day or night icon
        const time = getTime(timezone);
        //formatting to get valid weather name for icons
        switch(weather) {
            case 'clouds':
                weather = 'cloudy';
                break;
            case 'drizzle': 
                weather = 'sprinkle';
                break;
            case 'squall':
            weather = 'showers';
            break;  
            case 'mist':
            case 'haze':
                weather = 'fog';
                break; 
            case 'clear':
                weather = (time === 'night') ? weather : 'sunny';
                break;
            case 'smoke':
                weather = 'smoke';
                return `<i class="wi wi-smoke">`; 
            case 'dust':
                return `<i class="wi wi-dust">`;
            case 'sand':
                return `<i class="wi wi-sandstorm">`;
            case 'ash':
                return `<i class="wi wi-volcano">`;
            case 'tornado':
                return `<i class="wi wi-tornado">`;
        }
        return `<i class="wi wi-${time}-${weather}">`;
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
        containerEl.style.background = `url(images/${getTime(obj.timezone)}/${obj.weather.toLowerCase()}.jpg)`;
    }

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
})();