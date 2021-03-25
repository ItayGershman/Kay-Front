const gTTS = require('gtts');
const axios = require('axios');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { getLaser } = require('./Laser')
const { getPosition } = require('./Position');

const speak = (text, timer) => {
  console.log(text);
  const gtts = new gTTS(text, 'en');
  gtts.save('result.mp3', function (err, result) {
    if (err) {
      throw new Error(err);
    }
    console.log('Success! Open file result.mp3 to hear result.');
    const res = exec('nvlc result.mp3')
    timer.reset(10000)
  });
};

const sendResult = async (data, timer) => {
  let scenario = 'Welcoming'
  // Get Utterances from DB 
  let { intents, entities } = data;

  let intent;
  if (intents.length > 0) {
    intent = intents[0].name;
  }
  console.log('intent:', intent);

  //Need to send the intent to the server and get a response from the DB
  // const getResponse = await URL(intent)
  //check which scenario Kay is found
  //check the recieved intent

  const intentsByScenrio = await axios.get(
    `http://localhost:3030/routes/intent/${scenario}`
  );
  const intentObj = intentsByScenrio.data.find((elem) => {
    return `wit_${elem.intentName}` === intent
  });
  if (intentObj) {

    const outputOptions = intentObj.outputTextIntent;
    const randomElement = outputOptions[Math.floor(Math.random() * outputOptions.length)];

    // Add entity to the text to speak
    let textToSpeak = ""
    for (let key in entities) {
      if (entities.hasOwnProperty(key)) {
        console.log(key + " -> " + entities[key][0].value);
        textToSpeak = randomElement.speak.replace(`{${key.split(':')[0]}}`, entities[key][0].value)
      }
    }

    await speak(textToSpeak, timer);
    if (intent === 'wit_consent') {
      setTimeout(() => {
        getLaser(60, 20)
      }, 12000)
    }

    if (intent === 'wit_ready') {
      const tmpPosition = async () => {
        const returnValue = await getPosition()
        return returnValue
      }
      console.log('tmpPosition:', tmpPosition())
    }
    return true;
  } else {
    await speak('Fallback', timer);
    return true;
  }
};
module.exports.sendResult = sendResult;