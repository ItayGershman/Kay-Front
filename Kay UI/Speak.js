const { spawn } = require("child_process");
const actions = require("./actions");
const KayAPI = require("./KayAPI");
const {
  getWitResponse,
  speak,
  getTextToSpeak,
  saveHistory,
  changeNode,
} = require("./conversation-utils");

const scenarioConfig = (state,scenario) =>{
  KayAPI.getScenarioConfig(scenario).then(
    (res) => (state.configuration[scenario] = res.data.scenarioConfigData)
  );
}

const sendResult = async (data, state, ledLights) => {
  // const ledSpeak = spawn("python", ["/home/pi/4mics_hat/speak_led.py"]);
  // // in close event we are sure that stream from child process is closed
  // ledSpeak.on("close", (code) => {
  //   console.log(`child process close all stdio with code ${code}`);
  // });
  //Extract Intent and entiites
  let scenario = "Welcoming";
  let { intents, entities, text } = data;

  const witResponse = getWitResponse(intents, text);
  console.log("intent:", witResponse.intent);

  //set configuration for the current scenario
  if (!(scenario in state.configuration)) {
    scenarioConfig(state,scenario)
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
      if(intentObj === undefined){
        await speak(
          "Sorry, I did not understand, can you please say that again?",
          state
        );
        return true
      }
      scenario = intentObj?.scenarioConnection;
      scenarioConfig(state,scenario)
    }
    console.log("intentObj: ", intentObj);
    
    let currentNode = `${scenario}_${witResponse.intent}`;
    console.log(currentNode)
    //Check if the intent returned itself
    const found = state.history.find((el) => el.intent === witResponse.intent);
    if (found) {
      changeNode(state, currentNode, intentObj, scenario, witResponse);
    }
    //insert last node
    if (Object.keys(state.configuration).length !== 0) {
      const node = state.configuration[scenario]?.find((elem) => {
        if (elem?.id.includes(currentNode.replace("_wit", ""))) {
          return elem;
        }
      });
      console.log("node:",node);
      state.lastNode = node;
    }
    console.log("state:", state);
    if (intentObj ) {
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
      const text = await actions(witResponse.intent, entities);
      console.log("text:", text);
      ledLights.kill("SIGINT");

      if (text && text.length > 0) {
        speak(text, state);
      } else speak(textToSpeak, state);

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
