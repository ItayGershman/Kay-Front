const { spawn } = require('child_process')


const LED = () =>{
    // spawn new child process to call the python script
    const letLights = spawn('python', ['/home/pi/4mics_hat/pixels_demo.py']);
    // collect data from script
    letLights.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    letLights.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log('dataTosend:', dataToSend)
    });
}



module.exports.LED = LED;