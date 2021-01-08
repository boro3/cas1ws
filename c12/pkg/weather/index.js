const fetch = require('node-fetch');

const API_KEY = '582547fc77341a12028fa21f33c3cfdf';
const UNITS = 'metric';
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

const cityMaps = {
    'sk': 'skopje',
    'bt': 'bitola',
    'oh': 'ohrid',
    'te': 'tetovo',
    'ku': 'kumanovo',
    'gv': 'gostivar',
    'ge': 'gevgelija'
};

const cityMapsCord = {
    'sk': { lat: 42, lon: 21.4333 },
    'bt': { lat: 41.0311, lon: 21.3403 },
    'oh': { lat: 41.1172, lon: 20.8019 },
    'te': { lat: 42.0106, lon: 20.9714 },
    'ku': { lat: 42.1322, lon: 21.7144 },
    'gv': { lat: 41.7972, lon: 20.9083 },
    'ge': { lat: 41.1392, lon: 22.5025 }
};

let cache = {};
let sevenDayCache = {};

const getCityWeather = async (city) => {
    city = cityMaps[city.toLowerCase()];

    if (cache[city] && (new Date().getTime()) - cache[city].timestamp < 60 * 1000) {
        return cache[city].data;
    }
    let url = `${API_ENDPOINT}?appid=${API_KEY}&units=${UNITS}&q=${city}`;

    try {
        let data = await fetch(url);
        data = await data.json();

        cache[city] = {
            timestamp: new Date().getTime(),
            data
        };

        return data;
    } catch (err) {
        console.log(err);
    }
};

const getAverageTemperatures = (array) => {
    let result = {};
    let maxAvg = 0, minAvg = 0;
    for (let day in array) {
        maxAvg = maxAvg + array[day].temp.max;
        minAvg = minAvg + array[day].temp.min;
    }
    result.maxAvg = maxAvg / 7;
    result.minAvg = minAvg / 7;
    return result;
};

const getAverageWeather = async (city) => {
    let cords = cityMapsCord[city.toLowerCase()];
    city = cityMaps[city.toLowerCase()];
    if (sevenDayCache[city] && (new Date().getTime()) - sevenDayCache[city].timestamp < 60 * 1000) {
        let avg = getAverageTemperatures(sevenDayCache[city].data.daily);
        return avg;
    }
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cords.lat}&lon=${cords.lon}&units=metric&exclude=hourly,minutely,current,alerts&appid=${API_KEY}`
    try {
        let data = await fetch(url);
        data = await data.json();

        sevenDayCache[city] = {
            timestamp: new Date().getTime(),
            data
        };
        let avg = getAverageTemperatures(data.daily);
        return avg;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCityWeather,
    getAverageWeather
}