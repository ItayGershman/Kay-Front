const gTTS = require("gtts");
// const sound = require("sound-play");
const player = require("play-sound")((opts = {}));
// const Say = require("say").Say;
const moment = require("moment");
const { quickStart } = require("./googleActions/googleSpeech");

const getWitResponse = (intents, text) => {
  if (intents.length > 0)
    return {
      intent: intents[0].name,
      confidence: intents[0].confidence,
      text: text,
    };
  return {};
};

const speak = (text, state) => {
  state.isKaySpeaking = true;
  quickStart(text, state)
  // const gtts = new gTTS(text, "en-us");
  // gtts.save("result.mp3", async function (err, result) {
  //   if (err) {
  //     throw new Error(err);
  //   }
  //   console.log("Success! Open file result.mp3 to hear result.");
  //   try {

  //     return await player.play("./result.mp3", () => {
  //       state.isKaySpeaking = false;
  //       console.log("finish playing");
  //       return state.isKaySpeaking;
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
};

const getTextToSpeak = (entities, randomElement) => {
  let textToSpeak = "";
  for (let key in entities) {
    if (entities.hasOwnProperty(key)) {
      if(entities[key][0].confidence < 0.8) continue;
      console.log(key + " -> " + entities[key][0].value);
      textToSpeak = randomElement.speak.replace(
        `{${key.split(":")[0]}}`,
        entities[key][0].value
      );
    }
  }
  if (textToSpeak === "") {
    textToSpeak = randomElement.speak;
  }
  return textToSpeak;
};

const saveHistory = (speaker, text, intent, state) => {
  let time = moment().format("h:mm:ss a");
  state.history.push({
    name: speaker,
    message: text,
    intent,
    time,
    direction: speaker === "kay" ? "left" : "right",
  });
};

const changeNode = (state, currentNode, intentObj,scenario,witResponse) => {
  const sourceNode = state.configuration[scenario].find((elem) => {
    const lastNode = state.lastNode;
    console.log({lastNode})
    console.log(elem)
    if (lastNode && lastNode.id === elem?.source) return elem;
  });
  if(!sourceNode) return
  //only if sourceNode was found
  //Change current Node with the same intent
  let config = state.configuration[scenario];
  //targetNode could be more than 1 node - maybe always
  const targetNodes = config.filter((el) => el.id === sourceNode.target);
  //check if it's a possibility that targetNoes is empty
  const targetNode = targetNodes.find((el) => `wit_${el.data.intent}` === witResponse.intent);
  currentNode = `${targetNode.data.name}_${targetNode.data.intent}`;
  //change just the speak in the new intent
  intentObj.outputTextIntent = targetNode.data.speak;
};

module.exports = {
  getWitResponse,
  speak,
  getTextToSpeak,
  saveHistory,
  changeNode,
};
