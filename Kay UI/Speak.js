const { getPosition } = require("./Position");
const actions = require("./actions");
const KayAPI = require("./KayAPI");
const {
  getWitResponse,
  speak,
  getTextToSpeak,
  saveHistory,
  changeNode,
} = require("./conversation-utils");

const DEFAULT_SCENARIO = "Welcoming"

const scenarioConfig = async (state, scenario) => {
  const { data } = await KayAPI.getScenarioConfig(scenario);
  state.configuration[scenario] = data.scenarioConfigData
  return data.scenarioConfigData
}

const sendResult = async (data, state, ledLights, allLocations) => {
  if (state.conversationStarted) {
    if (data._text === "") {
      ledLights && ledLights.kill("SIGINT");
      state.isUserSpeaking = false
      await speak(
        "Sorry, I did not understand, can you please say that again?",
        state
      );
      return
    }
  }

  //Extract Intent and entities
  let scenario = DEFAULT_SCENARIO;
  let { intents, entities, text } = data;

  const witResponse = getWitResponse(intents, text);
  //set configuration for the current scenario
  if (!(scenario in state.configuration)) {
    const res = await scenarioConfig(state, scenario)
    let allIntents = []
    state.repetitiveIntents = res.filter((node) => {
      if (node.data) {

        if (allIntents.find((intent) => node.data.intent === intent)) {
          return true
        } else {
          allIntents.push(node.data.intent)
          return false
        }
      }
      else return false;
    }).map((intent) => {
      return intent.data.intent
    })
  }
  //check for hotword = wit_greetings
  if (
    state.conversationStarted === false &&
    witResponse.intent === "wit_greetings"
  ) {
    state.conversationStarted = true;
  }
  if (state.conversationStarted) {
    const intentsByScenrio = await KayAPI.getScenarioIntent(scenario);

    //Find the matched intent to the scenario
    let intentObj = intentsByScenrio.data.find((elem) =>
      `wit_${elem.intentName}` === witResponse.intent
    );
    if (intentObj === undefined) {
      const intentsByScenrio = await KayAPI.getAllIntents();
      //Find the matched intent to the scenario
      intentObj = intentsByScenrio.data.find((elem) => {
        return `wit_${elem.intentName}` === witResponse.intent;
      });
      // scenario = intentObj.scenarioConnection ? intentObj.scenarioConnection : undefined
      if (intentObj === undefined) {
        ledLights && ledLights.kill("SIGINT");
        state.isUserSpeaking = true
        await speak(
          "I don't know how to answer that, I probably need more training time...",
          state
        );
        return
      }
      scenario = intentObj ? intentObj.scenarioConnection : undefined
      await scenarioConfig(state, scenario)
    }


    let currentNode = `${scenario}_${witResponse.intent}`;
    //Check if the intent returned itself
    const found = state.history.some((el) => el.intent === witResponse.intent);
    if (found && state.repetitiveIntents.some((intent) => `wit_${intent}` === witResponse.intent)) {
      changeNode(state, currentNode, intentObj, scenario, witResponse);
    }
    //insert last node
    if (Object.keys(state.configuration).length !== 0) {
      let config = state.configuration[scenario];
      if (config) {
        state.lastNode = config.find((elem) => {
          if (elem.id && elem.id.includes(currentNode.replace("_wit", ""))) {
            return elem;
          }
        })
      }
    }
    if (intentObj) {
      //Get array of outputs
      const outputOptions = intentObj.outputTextIntent;
      //Random item from the array
      const randomElement =
        outputOptions[Math.floor(Math.random() * outputOptions.length)];
      const textToSpeak = getTextToSpeak(entities, randomElement);

      //Save history
      saveHistory("user", witResponse.text, witResponse.intent, state);
      saveHistory("kay", textToSpeak, witResponse.intent, state);

      //Speak text
      const action = state.configuration[scenario].find((node) => {
        return `wit_${node.data.intent}` === witResponse.intent
      })
      if (witResponse.intent === "wit_getDepartment") {
        const department = entities["department:department"][0].body
        state.videoName = department
      }
      if (witResponse.intent === "wit_ready") {
        const getKayPosition = async () => {
          return await getPosition();
        }
        let position = await getKayPosition()
        position = allLocations.data.find((elem) =>
          (position.includes(elem.RFID))
        )
        state.position = position.locationName
      }

      const text = await actions(action.data.action, entities, state);
      ledLights && ledLights.kill("SIGINT");
      state.isUserSpeaking = true
      if (text && text.length > 0) {
        speak(text, state);
      }
      else speak(textToSpeak, state);
      
      if (witResponse.intent === "wit_bye") {
        try {
          await KayAPI.saveConversationHistory(state.history);
        } catch (e) {
          console.log(e);
        }
      }

    } else {
      ledLights && ledLights.kill("SIGINT");
      state.isUserSpeaking = true
      await speak(
        "Sorry, I did not understand, can you please say that again?",
        state
      );
    }
    return
  }
  return
};
module.exports.sendResult = sendResult;