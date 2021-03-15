import instance from './API-config';
import axios from 'axios';
class API {
  static login(userEmail, userPassword) {
    console.log(userPassword, userEmail);
    return axios.post(`/routes/signin`, {
      userPassword,
      userEmail,
    });
  }
  static createUser(firstName, lastName, userPassword, userEmail) {
    console.log(firstName, lastName, userPassword, userEmail);
    return axios.post(`/routes/user`, {
      firstName,
      lastName,
      userPassword,
      userEmail,
    });
  }

  //Intent
  static createIntent(scenarioConnection, intentName, outputTextIntent) {
    const req = { scenarioConnection, intentName, outputTextIntent };
    console.log(req);
    return axios.post(`/routes/intent`, req);
  }

  //Scenario
  static getConfiguration(scenarioID) {
    return axios.get(`/scenario_config/${scenarioID}`);
  }
  static createConfiguration(scenarioID, elements) {
    return axios.get(`/scenario_config/${scenarioID}`, {
      scenarioConfigData: elements,
    });
  }
  static getAllScenarios() {
    return axios.get(`routes/scenario`)
  }
  static getScenario(scenarioName) {
    return axios.get(`routes/scenario/${scenarioName}`);
  }
  static createScenario(name, description, image) {
    console.log(name, description, image);
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
}
export default API;
