require("dotenv").config();
const rec = require("node-mic-record");
const axios = require("axios");
const { sendResult } = require("./Speak.js");
const witToken = process.env.WIT_ACCESS_TOKEN;
// const googleJson = process.env.GOOGLE_JSON;
const { exec, spawn } = require('child_process');
const { getAllLocations } = require("./KayAPI.js");
const { getPosition } = require("./Position.js");

exec('python clientGUI.py')
// exec(`export GOOGLE_APPLICATION_CREDENTIALS="${googleJson}"`) 
// exec('python googleCredentials')

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
      position: currPosition.locationName
    }
    while (conversation) {
      if (!state.isKaySpeaking) {
        console.log("lisetning...");
        const ledLights = state.conversationStarted && spawn("python", [
          "/home/pi/4mics_hat/pixels_demo.py",
        ]);
        await axios
          .post(
            reqData.url,
            rec.start({
              recordProgram: "rec",
              threshold: 0.8,
              verbose: true
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
            // if (data._text !== "") {
              await sendResult(data, state, ledLights, allLocations);
              console.log(data)
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
