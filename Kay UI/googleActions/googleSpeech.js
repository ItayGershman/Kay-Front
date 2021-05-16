// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function quickStart() {
    const [result] = await client.listVoices({});
    const voices = result.voices;
    console.log('Voices: ')
    voices.forEach((voice) =>{
        console.log(`Name: ${voice.name}`)
        console.log(`SSML: ${voice.ssmlGender}`)
    })
  // The text to synthesize
  const text = "Hey, I'm Kay, a conversational assistant";

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'MALE',name:'en-US-Standard-D'},
    // select the type of audio encoding 
    audioConfig: {audioEncoding: 'MP3'},
  };
  try{
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
  }catch(e){
      console.log(e)
  }
}
quickStart();