// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
const player = require("play-sound")((opts = {}));

// Import other required libraries
const fs = require('fs');
const util = require('util');
const { headPosition } = require('../HeadPosition');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function quickStart(text, state) {
  const [result] = await client.listVoices({});
  const voices = result.voices;
  // console.log('Voices: ')
  // voices.forEach((voice) => {
  //   console.log(`Name: ${voice.name}`)
  //   console.log(`SSML: ${voice.ssmlGender}`)
  // })
  // The text to synthesize
  // const text = "Hey, I'm Kay, a conversational assistant";

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE', name: 'en-US-Standard-C' },
    // select the type of audio encoding 
    audioConfig: { audioEncoding: 'MP3' },
  };
  try {
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    return await player.play("./output.mp3", () => {
      state.isKaySpeaking = false;
      console.log("finish playing");
      return state.isKaySpeaking;
    })
  } catch (e) {
    console.log(e)
  }
}
module.exports.quickStart = quickStart