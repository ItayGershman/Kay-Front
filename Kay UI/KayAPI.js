const axios = require('axios')

const BACKEND_URL = 'http://localhost:3030/routes'

class KayAPI {
    static getScenarioIntent(scenario) {
        return axios.get(`${BACKEND_URL}/intent/${scenario}`)
    }
    static getAllIntents() {
        return axios.get(`${BACKEND_URL}/intent`)
    }
    //create route for history in the backend
    static createConversation(history) {
        return axios.post(`${BACKEND_URL}/history`,history)
    }
}

module.exports = KayAPI