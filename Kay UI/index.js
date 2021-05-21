require("dotenv").config();
const rec = require("./node-mic-record-copy/node-mic-record-copy");
const axios = require("axios");
const { sendResult } = require("./Speak.js");
const { spawn } = require('child_process')

const witToken = process.env.WIT_ACCESS_TOKEN;

const reqData = {
  url: "https://api.wit.ai/speech?client=chromium&lang=en-us&output=json",
  headers: {
    Accept: "application/vnd.wit.20160202+json",
    Authorization: `Bearer ${witToken}`,
    "Content-Type": "audio/wav",
  },
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const WitAISpeechRecognition = async () => {
  let conversation = true;
  const startRecording = async () => {
    let state = {
      isKaySpeaking: false,
      conversationStarted: false,
      history: [],
      configuration: {},
      lastNode: {},
    };
    while (conversation) {
      if (!state.isKaySpeaking) {
        console.log("lisetning...");
        const ledLights = spawn("python", [
          "/home/pi/4mics_hat/speak_led.py",
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
              // silence: "1",
              threshold: 1.0,
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
            // letLights.kill()
            const { data } = res;
            if (data._text !== "") {
              await sendResult(data, state,ledLights);
              console.log(data);
            }
          })
          .catch((e) => console.log(e));
      } else {
        await sleep(500);
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
