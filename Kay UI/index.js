const Pusher = require('pusher-js');
const fetch = require('node-fetch');
const gTTS = require('gtts');
const sound = require('sound-play');
const path = require('path');
var rec = require('node-mic-record');
var request = require('request');

const speak = (text) => {
  const gtts = new gTTS(text, 'en');
  gtts.save('result.mp3', function (err, result) {
    if (err) {
      throw new Error(err);
    }
    console.log('Success! Open file /tmp/hello.mp3 to hear result.');
  });

  try {
    const filePath = path.join(__dirname, 'result.mp3');
    sound.play(filePath);
  } catch (error) {
    console.error(error);
  }
};
const greetings = ["Hey, how's it going?", "What's good with you?"]
const jokes =  [
  'Do I lose when the police officer says papers and I say scissors?',
  'I have clean conscience. I haven’t used it once till now.',
  'Did you hear about the crook who stole a calendar? He got twelve months.',
]

const WitAISpeechRecognition = async () => {
  console.log('Listening...');
  const sendResult = (err,resp,body) => {
    console.log(body);
    let intent = JSON.parse(body).intents[0].name
    console.log(JSON.parse(body).intents[0].name);
    //Need to send the intent to the server and get a response from the DB
    if(intent === 'wit_greetings') {
      speak(greetings[1]);
    }
    else if(intent === 'wit_getJoke'){
      speak(jokes[2])
    }
  }
  // To record we need to download SoX for the Raspberry Pi
  rec.start().pipe(
    request.post(
      {
        url: 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
        headers: {
          Accept: 'application/vnd.wit.20160202+json',
          Authorization: 'Bearer ' + '54X6WOZPQ4I2ZBH5XOZTWS4F3IZT7X7I',
          'Content-Type': 'audio/wav',
        },
      },
      (err, resp, body) => sendResult(err,resp,body)
    )
  );
  setTimeout(function () {
    rec.stop();
  }, 3000);
};

try {
  WitAISpeechRecognition();
} catch (error) {}



// const pusher = new Pusher('5f319b32e392688bf456', {
//   cluster: 'ap2',
//   encrypted: true,
// });

// fetch('http://localhost:7777/chat', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     message: 'tell me a joke',
//   }),
// });

// const channel = pusher.subscribe('bot');
// channel.bind('bot-response', (data) => {
//   const msg = {
//     text: data.message,
//     user: 'ai',
//   };
//   console.log(msg);
//   speak(msg.text);
// });
