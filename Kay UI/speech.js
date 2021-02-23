//WitaiASR is a class which I built in lib directory
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