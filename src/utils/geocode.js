const request = require("postman-request");

const geocode = (address, callback) => {
  const add = encodeURIComponent(address);
  console.log("geocode", address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}.json?access_token=pk.eyJ1Ijoia2FwaWwtayIsImEiOiJja2l3bTZ2YWMwdXYzMzBtZXc0ZDR4eDhvIn0.B0PQlcKar_Zz0P0sckrsDg`;

  request({ url: url, json: true }, (error, response) => {
    // console.log(response.body);
    // console.log(response.body);
    if (error) {
      //console.log(error);
      callback("Unable to connect to Mapbox API", undefined);
    } else if (response.body.message) {
      callback("Unable to get the co-ordinates of given location", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to get the co-ordinates of given location", undefined);
    } else {
      callback(undefined, {
        lng: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
