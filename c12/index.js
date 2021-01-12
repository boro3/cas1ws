const express = require('express');
const weather = require('./handlers/weather');
const cfg = require('./pkg/config');

const api = express();

api.get('/api/v1/weather/:city', weather.getWeather);
api.get('/api/v1/average/:city', weather.getAverageWeather);
api.get('/api/v1/averagesixteen/:city', weather.getAverageWeatherSixteenDays);
api.listen(cfg.get('server').port, err=>{
    if(err){
        return console.log(console.err);
    }
    console.log('Server successfully started on port', cfg.get('server').port);
});