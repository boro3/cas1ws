const express = require('express');
const weather = require('./handlers/weather');

const api = express();

api.get('/api/v1/weather/:city', weather.getWeather);
api.get('/api/v1/average/:city', weather.getAverageWeather);
api.listen(10000, err=>{
    if(err){
        return console.log(console.err);
    }
    console.log("Services Strated at porst 10000!");
});