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
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;

            callback(undefined, `${dailySummary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast;