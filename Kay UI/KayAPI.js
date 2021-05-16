const axios = require("axios");

const BACKEND_URL = "http://localhost:3030/routes";

class KayAPI {
  static getScenarioIntent(scenario) {
    return axios.get(`${BACKEND_URL}/intent/${scenario}`);
  }
  static getAllIntents() {
    return axios.get(`${BACKEND_URL}/intent`);
  }
  //create route for history in the backend
  static createConversation(history) {
    return axios.post(`${BACKEND_URL}/history`, history);
  }
  static getScenarioConfig(scenario) {
    return axios.get(`${BACKEND_URL}/scenario_config/${scenario}`);
  }
  static saveConversationHistory(conversation){
    return axios.post(`${BACKEND_URL}/conversation`,{
      text:conversation
    })
  }
  static getEquipments(){
    return axios.get(`https://spreadsheets.google.com/feeds/cells/1peROQvZeewIYwHBskuFl45f5jlJJvWADOSFhfoqqaaU/1/public/full?alt=json`)
  }
}

module.exports = KayAPI;
