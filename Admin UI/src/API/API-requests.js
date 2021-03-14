import instance from './API-config';

class API {
  static createUser(firstName, lastName, userPassword, userEmail) {
    return instance.post(`/routes/createUser`, {
      firstName,
      lastName,
      userPassword,
      userEmail,
    });
  }
  static login(userPassword, userEmail) {
    return instance.post(`/routes/createUser`, {
      userPassword,
      userEmail,
    });
  }
  //Intent
  static createIntent(scenarioConnection, intentName, outputTextIntent) {
    const req = { scenarioConnection, intentName, outputTextIntent };
    console.log(req);
    return instance.post(`/routes/intent`, req);
  }

  //Scenario
  static getConfiguration(scenarioID) {
    return instance.get(`/scenario_config/${scenarioID}`);
  }
  static createConfiguration(scenarioID, elements) {
    return instance.get(`/scenario_config/${scenarioID}`, {
      scenarioConfigData: elements,
    });
  }
  static getScenario(scenarioName) {
    return instance.get(`routes/scenario/${scenarioName}`);
  }
  static createScenario(scenario) {
    return instance.post(`routes/scenario`, {
      scenarioName: scenario.name,
      scenarioImage: scenario.image,
      scenarioDescription: scenario.description,
    });
  }
  static updateScenario(currScenarioName,scenario) {
    return instance.put(`routes/scenario/${currScenarioName}`, {
      scenario,
    });
  }
  static deleteScenario(scenarioName) {
    return instance.put(`routes/scenario/${scenarioName}`);
  }
}
export default API;
