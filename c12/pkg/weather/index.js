const fetch = require('node-fetch');
const cfg = require('./../config');

const UNITS = 'metric';
const OPW_ENDPOINT = cfg.get('open-weather').api_endpoint;
const OPW_API_KEY = cfg.get('open-weather').api_key;
const WB_ENDPOINT = cfg.get('weather-bit').api_endpoint;
const WB_API_KEY = cfg.get('weather-bit').api_key

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
let sixteenDayCache = {};

const getCityWeather = async (city) => {
    city = cityMaps[city.toLowerCase()];

    if (cache[city] && (new Date().getTime()) - cache[city].timestamp < 60 * 1000) {
        return cache[city].data;
    }
    let url = `${OPW_ENDPOINT}?appid=${OPW_API_KEY}&units=${UNITS}&q=${city}`;
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

const getAverageSixteenTemperatures = (array) => {
    let sixteenDayAvgTemp = 0;
    for (let day in array) {
        sixteenDayAvgTemp = sixteenDayAvgTemp + array[day].temp;
    }
    return sixteenDayAvgTemp = sixteenDayAvgTemp / 16;
};


const getAverageWeather = async (city) => {
    let cords = cityMapsCord[city.toLowerCase()];
    city = cityMaps[city.toLowerCase()];
    if (sevenDayCache[city] && (new Date().getTime()) - sevenDayCache[city].timestamp < 60 * 1000) {
        let avg = getAverageTemperatures(sevenDayCache[city].data.daily);
        return avg;
    }
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cords.lat}&lon=${cords.lon}&units=metric&exclude=hourly,minutely,current,alerts&appid=${cfg.get('open-weather').api_endpoint}`
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
};

const getAverageWeatherSixteenDays = async (city) => {
    city = cityMaps[city.toLowerCase()];
    if (sixteenDayCache[city] && (new Date().getTime()) - sixteenDayCache[city].timestamp < 60 * 1000) {
        let data = sixteenDayCache[city].data;
        let response = {
            sixteenDayAvgTemp: getAverageSixteenTemperatures(data.data),
            city_name:data.city_name ,
            lon:data.lon ,
            lat:data.lat ,
            timezone:data.timezone ,            
            country_code:data.country_code
        }
        return response;
    }
    let url = `${WB_ENDPOINT}?city=${city}&key=${WB_API_KEY}`
    try {
        let data = await fetch(url);
        data = await data.json();

        sixteenDayCache[city] = {
            timestamp: new Date().getTime(),
            data
        };
        let response = {
            sixteenDayAvgTemp: getAverageSixteenTemperatures(data.data),
            city_name:data.city_name ,
            lon:data.lon ,
            lat:data.lat ,
            timezone:data.timezone ,            
            country_code:data.country_code
        }
        return response;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getCityWeather,
    getAverageWeather,
    getAverageWeatherSixteenDays
};