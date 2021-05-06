require("dotenv").config();
const rec = require("node-mic-record");
const axios = require("axios");
const { sendResult } = require("./Speak.js");

const witToken = process.env.WIT_ACCESS_TOKEN;

const reqData = {
  url: "https://api.wit.ai/speech?client=chromium&lang=en-us&output=json",
  headers: {
    Accept: "application/vnd.wit.20160202+json",
    Authorization: `Bearer ${witToken}`,
    "Content-Type": "audio/wav",
  },
};

const sleep = (ms) =>{
  return new Promise(resolve => setTimeout(resolve,ms))
}

const WitAISpeechRecognition = async () => {
  let conversation = true;
  const startRecording = async () => {
    let state = {
      isKaySpeaking:false,
      conversationStarted:false,
      history:[],
      configuration:{},
      lastNode:{}
    }
    while (conversation) {
      if (!state.isKaySpeaking) {
        console.log("lisetning...");
        await axios
          .post(
            reqData.url,
            rec.start({
              recordProgram: "rec",
              silence: "0.7",
              threshold:0.7
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
            if (data._text !== "") {
              await sendResult(data, state);
              console.log(data)
            }
          })
          .catch((e) => console.log(e));
      }
      else {
        console.log(state.isKaySpeaking)
        await sleep(500)
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
