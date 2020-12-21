const request = require("postman-request");
const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1fb0d9610a16c830d276f5a2f48c8731&query=${lat},${lng}&units=m`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather API", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        desc: response.body.current.weather_descriptions[0],
        location: response.body.location.name,
        temp: response.body.current.temperature,
        precip: response.body.current.precip,
      });
    }
  });
};

module.exports = forecast;
