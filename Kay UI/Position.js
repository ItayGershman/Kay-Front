const { spawn } = require('child_process')

const getPosition = () => {
    //Check python script
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['RFID.py', 'Entrance']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log('dataTosend:', dataToSend)
    });
}

module.exports.getPosition = getPosition;