const mqtt = require('mqtt')
const getEquipment = require("./googleActions/googleSheets");

const displayVideo = (client, department,position) => {
  console.log({position})
  console.log({department})
  client.subscribe(`KAY/${position}/${department}`, (err) => {
    if (!err) console.log('subscribed to KAY/video');
    else console.log({err})
    client.publish(`KAY/${position}/${department}`, department);
  });
  client.unsubscribe(`KAY/${position}/${department}`, (err) => {
    if (!err) console.log(`unsubscribe from KAY/${position}/${department}`);
  });
}

const actions = (action, payload, state) => {
  switch (action?.value) {
    case "video":
      let department = state.videoName;
      const client = mqtt.connect('mqtt://test.mosquitto.org:1883');
      console.log({client})
      client.on('connect',()=>{
        if (department) {
          if (department.includes("software")) {
            displayVideo(client, "software",state.position)
          }
          if (department.includes("industrial")) {
            displayVideo(client, "industrial",state.position)
          }
        }
        return `Welcome to ${state.position}`
      })
      
      break;
    case "laser":
      console.log("laser");
      break;
    case "equipment":
      const text = getEquipment(payload)
      return text;
  }
};
module.exports = actions;
