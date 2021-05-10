const { getLaser } = require("./Laser");
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

const sendResult = async (data, state) => {
  //Extract Intent and entiites
  let scenario = "Welcoming";
  let { intents, entities, text } = data;

  const witResponse = getWitResponse(intents, text);
  console.log("intent:", witResponse.intent);

  //set configuration for the current scenario
  if (!(scenario in state.configuration)) {
    KayAPI.getScenarioConfig(scenario).then(
      (res) => (state.configuration[scenario] = res.data.scenarioConfigData)
    );
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
      scenario = intentObj?.scenarioConnection;
    }
    console.log("intentObj: ", intentObj);

    let currentNode = `${scenario}_${witResponse.intent}`;
    //Check if the intent returned itself
    const found = state.history.find((el) => el.intent === witResponse.intent);
    if (found) {
      changeNode(state, currentNode, intentObj, scenario, witResponse);
    }
    //insert last node
    if (Object.keys(state.configuration).length !== 0) {
      state.lastNode = state.configuration[scenario]?.find((elem) => {
        if (elem?.id.includes(currentNode.replace("_wit", ""))) {
          return elem;
        }
      });
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
      const text = await actions(witResponse.intent,entities);
      console.log('text:',text)
      if(text && text.length > 0){
        speak(text, state);
      }
      else speak(textToSpeak, state);
      //Laser to the coordiantes
      // if (witResponse.intent === "wit_consent") {
      //   setTimeout(() => {
      //     getLaser(60, 20);
      //   }, 12000);
      // }
      // //Get Kay's position with RFID
      // if (witResponse.intent === "wit_ready") {
      //   console.log("history: ", state.history);
      //   getPosition();
      // }
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
