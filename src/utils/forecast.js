const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d9347b8b18863f725e4ece64c34e027b/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to get forecast, try another search.');
        } else {
            const dailySummary = body.daily.data[0].summary;
            const temperature = Math.round(body.currently.temperature);
            const minTemperature = Math.round(body.daily.data[0].temperatureMin);
            const maxTemperature = Math.round(body.daily.data[0].temperatureMax);
            const precipProbability = body.currently.precipProbability;

            callback(undefined, `${dailySummary} The minimum temperature is ${minTemperature} ‎°C and the maximum is ${maxTemperature} ‎°C. It is currently ${temperature} ‎°C. There is a ${precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast;