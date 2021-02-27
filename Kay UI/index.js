require('dotenv').config();
const rec = require('node-mic-record');
const request = require('request');
const { resolve } = require('path');
const { sendResult } = require('./Speak.js');
const { Timer } = require('./Timer');

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
    console.log('start recording');
    rec.start().pipe(
      request.post(reqData, async (err, resp, body) => {
        const data = JSON.parse(body);
        if (data._text === '') {
          response = false;
        } else {
          timer.stop();
          response = await sendResult(err, resp, data);
          console.log('res: ', response);
          response = false;
          timer.reset(5000);
        }
      })
    );
    //After 5 seconds Kay stop recording
    setTimeout(function () {
      rec.stop();
    }, 5000);
  };
  //Every 10 seconds Kay relistening
  const timer = new Timer(function () {
    if (!response) {
      console.log('Listening...');
      startRecording(timer);
    }
  }, 5000);
  timer.start();
};

try {
  WitAISpeechRecognition();
} catch (error) {
  console.log(error);
}
