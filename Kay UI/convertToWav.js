var CloudmersiveVideoApiClient = require('cloudmersive-video-api-client');
var defaultClient = CloudmersiveVideoApiClient.ApiClient.instance;
// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = 'YOUR API KEY';
var apiInstance = new CloudmersiveVideoApiClient.AudioApi();
var opts = {
  inputFile: Buffer.from(fs.readFileSync('C:\\temp\\inputfile').buffer), // File | Input file to perform the operation on.
  fileUrl: 'fileUrl_example', // String | Optional; URL of an audio file being used for conversion. Use this option for files larger than 2GB.
  sampleRate: 8.14, // Number | Optional; Specify the desired sample rate of the converted audio file in kHz. Value may be between 8 and 96. Standard for audio CDs is 44.1, while DVD audio standard is 48. By default, the optimal sample rate will be chosen automatically.
};
var callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.audioConvertToWav(opts, callback);
