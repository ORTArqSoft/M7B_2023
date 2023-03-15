const axios = require("axios");

// (error: string, response: {}) => void
const weather = (address, callback) => {
  axios
    .get(
      `http://api.weatherstack.com/current?access_key=bc5a0ca821db96b0732318b38be114c6&query=${address}`
    )
    .then((response) => {
      if (response.data.error) {
        callback(
          `Unable to retrieve weather data from location ${address}`,
          undefined
        );
      } else {
        callback(undefined, response.data);
      }
    })
    .catch((error) => {
      callback(
        `Unable to retrieve weather data from API ${JSON.stringify(error)}`,
        undefined
      );
    });
};

module.exports = weather;
