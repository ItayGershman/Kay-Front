var rec = require('node-mic-record');
var request = require('request');

var witToken = process.env.WIT_TOKEN; // get one from wit.ai!

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
          Authorization: 'Bearer ' + '54X6WOZPQ4I2ZBH5XOZTWS4F3IZT7X7I',
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
