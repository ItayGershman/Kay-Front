const { spawn } = require('child_process')
var dataToSend = undefined
const getPosition = async () => {
    //Check python script
    // spawn new child process to call the python script
    const python = spawn('python', ['RFID.py', 'Entrance']);
    // collect data from script
    python.stdout.on('data', await function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log('before return:', dataToSend)
        return dataToSend
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log('dataTosend:', dataToSend)
    });
    // return dataToSend
    // console.log('After function:', dataToSend)
}

module.exports.getPosition = getPosition;