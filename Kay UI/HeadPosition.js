const { spawn } = require('child_process')

const headPosition = (x, y) => {
    //Check python script
    var dataToSend;
    var xPosition = x
    var yPosition = y

    //Convert degrees to PWM degrees

    xPosition = ((xPosition/18)+2.5).toFixed(3)
    yPosition = ((yPosition/18)+2.5).toFixed(3)

    console.log('x:', xPosition, 'y:', yPosition)

    // spawn new child process to call the python script
    const python = spawn('python', ['HeadPosition.py', xPosition, yPosition]);
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

module.exports.headPosition = headPosition;