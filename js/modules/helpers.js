//converts temp from kelvin to celsius
export const toCelsius = (num) => Math.round(num - 273.1);
//converts wind speed from m/s to km/h
export const toKmh = (num) => +((num * 3.6).toFixed(1));
//discovers if its day or night time based on the hour
export const getTime = (timezone) => {
    const hour = +(timezone.slice(0, 2).replace(':', ''));
    const time = (hour >= 6 && hour <= 19) ? 'day' : 'night';
    return time;
};
//gets valid url image
export const getImageUrl = (timezone, weather) => `url(images/${getTime(timezone)}/${weather.toLowerCase()}.jpg)`;