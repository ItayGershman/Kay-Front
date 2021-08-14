import axios from 'axios';
const BACKEND_URL = 'https://kay-va.herokuapp.com'
class API {
  static login(userEmail, userPassword) {
    return axios.post(`${BACKEND_URL}/routes/signin`, {
      userPassword,
      userEmail,
    });
  }
  static createUser(firstName, lastName, userPassword, userEmail) {
    return axios.post(`${BACKEND_URL}/routes/user`, {
      firstName,
      lastName,
      userPassword,
      userEmail,
    });
  }

  //Intent
  static createIntent(
    scenarioConnection,
    intentName,
    outputTextIntent,
    entities,
    action
  ) {
    const req = { scenarioConnection, intentName, outputTextIntent, entities,action };
    return axios.post(`${BACKEND_URL}/routes/intent`, req);
  }
  static updateIntent(
    scenarioConnection,
    intentName,
    outputTextIntent,
    entities,
    action
  ) {
    const req = { scenarioConnection, intentName, outputTextIntent, entities,action };
    return axios.put(`${BACKEND_URL}/routes/intent/${scenarioConnection}/${intentName}`, req);
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
    return axios.get(`${BACKEND_URL}/routes/scenario`);
  }
  static getScenario(scenarioName) {
    return axios.get(`${BACKEND_URL}/routes/scenario/${scenarioName}`);
  }
  static createScenario(name, description, image) {
    return axios.post(`${BACKEND_URL}/routes/scenario`, {
      scenarioName: name,
      scenarioImage: image,
      scenarioDescription: description,
    });
  }
  static updateScenario(currScenarioName, scenario) {
    return axios.put(`${BACKEND_URL}/routes/scenario/${currScenarioName}`, {
      scenario,
    });
  }
  static deleteScenario(scenarioName) {
    return axios.put(`${BACKEND_URL}/routes/scenario/${scenarioName}`);
  }

  static getConfiguration(scenarioName) {
    return axios.get(`${BACKEND_URL}/routes/scenario_config/${scenarioName}`);
  }
  static createConfiguration(name) {
    return axios.post(`/routes/scenario_config`, {
      scenarioConfigData: [],
      scenarioConfigName: name,
    });
  }
  static updateConfiguration(scenarioConfigName, configuration) {
    return axios.put(`${BACKEND_URL}/routes/scenario_config/${scenarioConfigName}`, {
      scenarioConfigName: scenarioConfigName,
      scenarioConfigData: configuration
    });
  }
  static deleteConfiguration(scenarioID) {
    return axios.delete(`${BACKEND_URL}/routes/scenario_config/${scenarioID}`);
  }
  static getHistory() {
    return axios.get(`${BACKEND_URL}/routes/conversation`);
  }
  static createWitIntent(intentName,config) {
    return axios.post(
      `https://api.wit.ai/intents`,
      {
        name: intentName,
      },
      config
    );
  }
  static createWitEntity(entity,config) {
    return axios.post(
      `https://api.wit.ai/entities`,
      {
        entity: entity,
        roles:[]
      },
      config
    );
  }
}
export default API;
