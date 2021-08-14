require("dotenv").config();
const rec = require("node-mic-record");
const axios = require("axios");
const { sendResult } = require("./Speak.js");
const witToken = process.env.WIT_ACCESS_TOKEN;
const { exec, spawn } = require('child_process');
const { getAllLocations } = require("./KayAPI.js");
const { getPosition } = require("./Position.js");
const KayAPI = require("./KayAPI.js");

const CONVERSATION_TIME_LIMIT = 30000;

exec('python clientGUI.py')

const reqData = {
  url: "https://api.wit.ai/speech?client=chromium&lang=en-us&output=json",
  headers: {
    Accept: "application/vnd.wit.20160202+json",
    Authorization: `Bearer ${witToken}`,
    "Content-Type": "audio/wav",
  },
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const clearState = (state) => {
  state.isKaySpeaking = false;
  state.conversationStarted = false;
  state.history = [];
  state.configuration = {};
  state.lastNode = {};
  state.videoName = null;
  state.repetitiveIntents = [];
  state.isUserSpeaking = false;
  state.userStopTalkingTime = null;
}

const finishConversation = async (state) =>{
  let currentTime = new Date().getTime();
  if (state.userStopTalkingTime) {
    const compareTime = currentTime - state.userStopTalkingTime
    if (compareTime > CONVERSATION_TIME_LIMIT) {
      if (state.history.length > 2) await KayAPI.saveConversationHistory(state.history);
      clearState(state)
    }
  }
}


const WitAISpeechRecognition = async () => {
  let conversation = true;
  let allLocations = await getAllLocations()
  let rfid = await getPosition()
  const currPosition = allLocations.data.find((elem) => {
    if (rfid.includes(elem.RFID)) {
      return elem.locationName
    }
  })

  const startRecording = async () => {

    let state = {
      isKaySpeaking: false,
      conversationStarted: false,
      history: [],
      configuration: {},
      lastNode: {},
      videoName: null,
      position: currPosition.locationName,
      repetitiveIntents: [],
      isUserSpeaking: false,
      userStopTalkingTime:null
    }
    while (conversation) {
      if (state.conversationStarted && !state.isUserSpeaking && !state.userStopTalkingTime) state.userStopTalkingTime = new Date().getTime();
      if (!state.isKaySpeaking) {
        console.log("lisetning...");
        const ledLights = spawn("python", [
          "/home/pi/4mics_hat/pixels.py",
        ]);
        // collect data from script
        ledLights.stdout.on("data", function (data) {
          console.log("Pipe data from python script ...");
          // dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        ledLights.on("close", (code) => {
          console.log(`child process close all stdio with code ${code}`);
          // console.log("dataTosend:", dataToSend);
        });

        await axios
          .post(
            reqData.url,
            rec.start({
              recordProgram: "rec",
              threshold: 1.7,
              verbose: true,
            }),
            {
              headers: {
                Accept: "application/vnd.wit.20160202+json",
                Authorization: `Bearer ${witToken}`,
                "Content-Type": "audio/wav",
              },
            }
          )
          .then(async (res) => {
            const { data } = res;
            await sendResult(data, state, ledLights, allLocations);
            if (state.isUserSpeaking) {
              console.log("user speaks")
            }
            else {
              finishConversation(state)
            }
          })
          .catch((e) => console.log(e));
      }
      else {
        await sleep(100)
      }
    }
  };
  startRecording();
};

try {
  WitAISpeechRecognition();
} catch (error) {
  console.log(error.message);
}
