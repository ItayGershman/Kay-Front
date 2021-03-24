import instance from './API-config';
import axios from 'axios';
class API {
  static login(userEmail, userPassword) {
    return axios.post(`/routes/signin`, {
      userPassword,
      userEmail,
    });
  }
  static createUser(firstName, lastName, userPassword, userEmail) {
    return axios.post(`/routes/user`, {
      firstName,
      lastName,
      userPassword,
      userEmail,
    });
  }

  //Intent
  static createIntent(scenarioConnection, intentName, outputTextIntent) {
    console.log('create intent')
    const req = { scenarioConnection, intentName, outputTextIntent };
    return axios.post(`/routes/intent`, req);
  }

  //Scenario
  // static getConfiguration(scenarioID) {
  // return axios.get(`routes/scenario_config/${scenarioID}`);
  // }
  // static createConfiguration() {
  //   return axios.post(`scenario_config`, {
  //     scenarioConfigData: [],
  //   });
  // }
  static getAllScenarios() {
    return axios.get(`routes/scenario`);
  }
  static getScenario(scenarioName) {
    return axios.get(`routes/scenario/${scenarioName}`);
  }
  static createScenario(name, description, image) {
    return axios.post(`routes/scenario`, {
      scenarioName: name,
      scenarioImage: image,
      scenarioDescription: description,
    });
  }
  static updateScenario(currScenarioName, scenario) {
    return axios.put(`routes/scenario/${currScenarioName}`, {
      scenario,
    });
  }
  static deleteScenario(scenarioName) {
    return axios.put(`routes/scenario/${scenarioName}`);
  }

  static getConfiguration(scenarioName) {
    return axios.get(`/routes/scenario_config/${scenarioName}`);
  }
  static createConfiguration(name) {
    return axios.post(`/routes/scenario_config`, {
      scenarioConfigData: [],
      scenarioConfigName: name,
    });
  }
  static updateConfiguration(scenarioConfigName, configuration) {
    return axios.put(`/routes/scenario_config/${scenarioConfigName}`, {
      scenarioConfigData: configuration,
    });
  }
  static deleteConfiguration(scenarioID) {
    return axios.delete(`/routes/scenario_config/${scenarioID}`);
  }
}
export default API;
