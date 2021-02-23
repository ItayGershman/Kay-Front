var rec = require('node-mic-record');
var request = require('request');

var witToken = process.env.WIT_AI_TOKEN; // get one from wit.ai!

// exports.parseResult = function (err, resp, body) {
//   console.log(`body:${body}`);
// };
const sendResult = (err,resp,body){
  console.log(body);
}
console.log('Listening...');
rec
  .start()
  .pipe(
    request.post(
      {
        url: 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
        headers: {
          Accept: 'application/vnd.wit.20160202+json',
          Authorization: 'Bearer ' + `${witToken}`,
          'Content-Type': 'audio/wav',
        },
      },
      (err, resp, body) => sendResult(err,resp,body);
    )
  )
  .on('data', (data) => {
    // log.debug(`getAudioSoundFile:: Path saved in AWS: ${data.toString()}`);
    console.log(data.toString());
  });
setTimeout(function () {
  rec.stop();
}, 3000);
