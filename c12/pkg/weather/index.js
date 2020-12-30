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

let cache = {};

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

const getAverageWeather= async (city) =>{
    city = cityMaps[city.toLowerCase()];
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=16&units=${UNITS}&appid=${API_KEY}`
}

module.exports = {
    getCityWeather
}