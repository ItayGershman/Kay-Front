const gTTS = require("gtts");
const axios = require("axios");
const { getLaser } = require("./Laser");
const { getPosition } = require("./Position");
// const sound = require("sound-play");
const player = require("play-sound")((opts = {}));
// const Say = require("say").Say;
const actions = require("./actions");
const moment = require("moment");
const KayAPI = require("./KayAPI");

const getWitResponse = (intents,text) =>{
  if (intents.length > 0) return {
    intent : intents[0].name,
    confidence : intents[0].confidence,
    text : text,
  }
  return {}
}

const speak = (text, state) => {
  state.isKaySpeaking = true;
  console.log(text);
  const gtts = new gTTS(text, "en-us");
  gtts.save("result.mp3", async function (err, result) {
    if (err) {
      throw new Error(err);
    }
    console.log("Success! Open file result.mp3 to hear result.");
    // const res = exec('nvlc result.mp3')
    try {
      // const say = new Say('linux');
      // const voices = ['voice_rab_diphone','voice_ked_diphone','voice_don_diphone',]
      // say.speak(text,'voice_us1_mbrola',1.0,(err) =>{
      //   if(err){
      //     return console.error(err)
      //   }
      //   state.isKaySpeaking= false
      // })
      // console.log('done speaking')

      return await player.play("./result.mp3", () => {
        state.isKaySpeaking = false;
        console.log("finish playing");
        return state.isKaySpeaking;
      });
    } catch (error) {
      console.error(error);
    }
  });
};

const getTextToSpeak = (entities, randomElement) => {
  let textToSpeak = "";
  for (let key in entities) {
    if (entities.hasOwnProperty(key)) {
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

const saveHistory = (speaker, text, state) => {
  //date backend adds
  let date = moment(new Date()).format("DD/MM/YYYY");
  let time = moment().format("h:mm:ss a");
  state.history.push({
    name: speaker,
    message: text,
    time,
    direction: speaker === "kay" ? "left" : "right",
  });
};

const sendResult = async (data, state) => {
  //Extract Intent and entiites
  let scenario = "Welcoming";
  let { intents, entities, text } = data;
  
  const witResponse = getWitResponse(intents,text)
  console.log("intent:", witResponse.intent);

  /*TODOS:
   * Check if confidence is above 0.8 - V
   * send text and Kay's speak to history with date and time
   * Verify intent - start the conversation only if it's wit_greetings - V
   * Improve code readability -V
   */

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
    console.log(intentObj);
    if (intentObj === undefined) {
      const intentsByScenrio = await KayAPI.getAllIntents();
      //Find the matched intent to the scenario
      intentObj = intentsByScenrio.data.find((elem) => {
        return `wit_${elem.intentName}` === witResponse.intent;
      });
      console.log("intentObj: ", intentObj);
      scenario = intentObj?.scenarioConnection;
    }

    if (intentObj && witResponse.confidence > 0.8) {
      //Get array of outputs
      const outputOptions = intentObj.outputTextIntent;
      //Random item from the array
      const randomElement =
        outputOptions[Math.floor(Math.random() * outputOptions.length)];
      const textToSpeak = getTextToSpeak(entities, randomElement);
      console.log(textToSpeak);

      //Save history
      saveHistory("user", witResponse.text, state);
      saveHistory("kay", textToSpeak, state);

      //Speak text
      speak(textToSpeak, state);
      actions(witResponse.intent);
      //Laser to the coordiantes
      if (witResponse.intent === "wit_consent") {
        setTimeout(() => {
          getLaser(60, 20);
        }, 12000);
      }
      //Get Kay's position with RFID
      if (witResponse.intent === "wit_ready") {
        console.log('history: ',state.history)
        getPosition();
      }
      if (witResponse.intent === "wit_bye") {
        console.log('history: ',state.history)
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