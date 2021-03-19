const gTTS = require('gtts');
// const sound = require('sound-play');
const path = require('path');
const { randomBytes } = require('crypto');
const player = require('play-sound')(opts = {})

const greetings = ["Hey, how's it going?", "What's good with you?"];
const jokes = [
  'Do I lose when the police officer says papers and I say scissors?',
  'I have clean conscience. I haven’t used it once till now.',
  'Did you hear about the crook who stole a calendar? He got twelve months.',
];

const speak = async (text) => {
  console.log(text);
  const gtts = new gTTS(text, 'en');
  gtts.save('result.mp3', function (err, result) {
    if (err) {
      throw new Error(err);
    }
    console.log('Success! Open file result.mp3 to hear result.');
  });

  try {
    const filePath = path.join(__dirname, 'result.mp3');
    console.log('im here')
    return player.play('result.mp3', function(err){
      if (err){
        console.log('error', err)
        throw err
      } 
    })
    // return sound.play(filePath).then(() => {
    //   return true;
    // });
  } catch (error) {
    console.error(error);
  }
};

const sendResult = async (data) => {
  let scenario = 'welcoming'
  // Get Utterances from DB 
  
  let { intents } = data;
  let intent;
  if (intents.length > 0) {
    intent = intents[0].name;
  } else return false;
  console.log(intent);
  //Need to send the intent to the server and get a response from the DB
  // const getResponse = await URL(intent)
  //check which scenario Kay is found
  //check the recieved intent
  if (intent === 'wit_greetings') {
    const res = await speak(greetings[1]);
    console.log(`res ->`, res);
    return true;
  } else if (intent === 'wit_getJoke') {
    speak(jokes[2]);
    return true;
  }
};
module.exports.sendResult = sendResult;