require('dotenv').config();
const rec = require('node-mic-record');
const axios = require('axios');
const { sendResult } = require('./Speak.js');
const { Timer } = require('./Timer');
const { getPosition } = require('./Position')

const witToken = process.env.WIT_ACCESS_TOKEN;

const reqData = {
  url: 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
  headers: {
    Accept: 'application/vnd.wit.20160202+json',
    Authorization: `Bearer ${witToken}`,
    'Content-Type': 'audio/wav',
  },
};

const WitAISpeechRecognition = async () => {
  let response = false;
  const startRecording = (timer) => {
    axios
      .post(reqData.url, rec.start({
        recordProgram: 'arecord',
      }), {
        headers: {
          Accept: 'application/vnd.wit.20160202+json',
          Authorization: `Bearer ${witToken}`,
          'Content-Type': 'audio/wav',
        },
      })
      .then(async (res) => {
        const { data } = res;
        if (data._text === '') {
          response = false;
        } else {
          timer.stop();
          response = true;
          let tmp = false
          tmp = await sendResult(data, timer);
          // response = await sendResult(data);
          console.log('data:', data)
          if (tmp) {
            response = false
            timer.reset(10000);
          }
        }
      })
      .catch((e) => console.log(e));
    //After 5 seconds Kay stop recording
    setTimeout(function () {
      rec.stop();
    }, 3000);
  };
  //Every 10 seconds Kay relistening
  const timer = new Timer(function () {
    if (!response) {
      console.log('Listening...');
      startRecording(timer);
    }
  }, 10000);
  timer.start();
};

try {
  //Call to check the position
  getPosition() // Needs to add another call to this function after "Ready intent"
  // send request for welcoming scenario

  WitAISpeechRecognition();
} catch (error) {
  console.log(error);
}