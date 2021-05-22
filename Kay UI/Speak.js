// const { getLaser } = require("./Laser");
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

const scenarioConfig = async (state, scenario) => {
  const { data } = await KayAPI.getScenarioConfig(scenario);
  state.configuration[scenario] = data.scenarioConfigData
  return data.scenarioConfigData
  // await KayAPI.getScenarioConfig(scenario).then(
  //   (res) => (state.configuration[scenario] = res.data.scenarioConfigData)
  // );
}

const sendResult = async (data, state, ledLights, allLocations) => {
  //Extract Intent and entities
  let scenario = "Welcoming";
  let { intents, entities, text } = data;

  const witResponse = getWitResponse(intents, text);
  console.log("intent:", witResponse.intent);

  //set configuration for the current scenario
  if (!(scenario in state.configuration)) {
    await scenarioConfig(state, scenario)
    console.log('inside if')
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
    let intentObj = intentsByScenrio.data.find((elem) => {
      return `wit_${elem.intentName}` === witResponse.intent;
    });
    if (intentObj === undefined) {
      const intentsByScenrio = await KayAPI.getAllIntents();
      //Find the matched intent to the scenario
      intentObj = intentsByScenrio.data.find((elem) => {
        return `wit_${elem.intentName}` === witResponse.intent;
      });
      // scenario = intentObj.scenarioConnection ? intentObj.scenarioConnection : undefined
      if (intentObj === undefined) {
        await speak(
          "Sorry, I did not understand, can you please say that again?",
          state
        );
        return true
      }
      scenario = intentObj ? intentObj.scenarioConnection : undefined
      console.log("intentObj: ", intentObj);
      await scenarioConfig(state, scenario)
      console.log("changed scenario")
    }


    let currentNode = `${scenario}_${witResponse.intent}`;
    //Check if the intent returned itself
    const found = state.history.find((el) => el.intent === witResponse.intent);
    if (found) {
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
    if (intentObj && witResponse.confidence > 0.8) {
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
        console.log("witResponse.intent:", witResponse.intent)
        console.log(`wit_${node.data.intent}: `, `wit_${node.data.intent}`)
        return `wit_${node.data.intent}` === witResponse.intent
      })
      console.log(action)
      if (action.data.action) {
        console.log('action of action:', action.data.action)
      }
      console.log(witResponse.intent)
      if (witResponse.intent === "wit_getDepartment") {
        const department = entities["department:department"][0].body
        console.log(department)
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
      ledLights.kill("SIGINT");
      if (text && text.length > 0) {
        speak(text, state);
      }
      else speak(textToSpeak, state);
      
      if (witResponse.intent === "wit_bye") {
        console.log("history: ", state.history);
        try {
          const res = KayAPI.saveConversationHistory(state.history);
          console.log(res);

        } catch (e) {
          console.log(e);
        }
        //clean state
        //maybe retrieve position to the entrace
        //send history to backend
      }
    } else {
      await speak(
        "Sorry, I did not understand, can you please say that again?",
        state
      );
    }
    return true;
  }
  return false;
};
module.exports.sendResult = sendResult;