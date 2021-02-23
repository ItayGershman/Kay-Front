// const speech = require('@google-cloud/speech');
// const fs = require('fs');

// const Speech = async () => {
//   const client = new speech.SpeechClient();
//   const filename = 'resources/result.mp3';

//   const audioBytes = fs.readFileSync(filename).toString('base64');

//   const audio = {
//     content: audioBytes,
//   };
//   const config = {
//     encoding: 'LINEAR16',
//     sampleRateHertz: 16000,
//     languageCode: 'en-US',
//   };
//   const request = {
//     audio: audio,
//     config: config,
//   };
//   const [response] = await client.recognize(request);
//   const transcription = response.results
//     .map((result) => result.alternatives[0].transcript)
//     .join('\n');
//   console.log('Transcription: ', transcription);
// };

// module.exports = Speech;

/**
 * curl -XPOST 'https://api.wit.ai/speech' \
     -i -L \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: audio/wav" \
     --data-binary "XXXXXXXXXXXXXXXXXXXXXXXXXXXx"
 */


const witaiSpeech = require('./lib/WitaiASR');

const ACCESS_TOKEN = process.env.WIT_AI_TOKEN;

const witai = new witaiSpeech({token: ACCESS_TOKEN});

const filepath = './test.wav';

witai.recognize(filepath).then(res => {
  console.log('res.status', res.status)
  return res.json();
}).then((result) => {
  console.log('result json', result);
});