import {getTime} from './helpers.js';
//gets valid icon based on time and weather
export const getIcon = (timezone, weather) => {
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
};