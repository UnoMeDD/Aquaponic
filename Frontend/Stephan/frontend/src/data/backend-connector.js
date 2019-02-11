const axios = require("axios");

// get content from backend
class BackendConnector {
  // async function -> webrequest for callback
  static temperatureEndpoint = async timespan => {
    // error CORS: allow origin (access control)
    let endpointUrl =
      "http://localhost:4000/temperature" + "?timespan=" + timespan;
    // await: to get data step by step
    try {
      let response = await axios.get(endpointUrl); // get request
      let data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static ambientTemperature = async timespan => {
    let endpointUrl =
      "http://localhost:4000/temperature" + "?timespan=" + timespan;

    try {
      let response = await axios.get(endpointUrl);
      let data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static phEndpoint = async timespan => {
    let endpointUrl = "http://localhost:4000/ph" + "?timespan=" + timespan;

    try {
      let response = await axios.get(endpointUrl);
      let data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static waterLevel = async timespan => {
    let endpointUrl =
      "http://localhost:4000/temperature" + "?timespan=" + timespan;

    try {
      let response = await axios.get(endpointUrl);
      let data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static pumpEndpoint = async timespan => {
    let endpointUrl = "http://localhost:4000/pump";

    try {
      let response = await axios.get(endpointUrl);
      let data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static armPositionEndpoint = async timespan => {
    let endpointUrl = "http://localhost:4000/pump";

    try {
      let response = await axios.get(endpointUrl);
      let data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default BackendConnector;
