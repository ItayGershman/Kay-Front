const mqtt = require('mqtt')
const getEquipment = require("./googleActions/googleSheets");

const displayVideo = (client, department,position) => {
  client.subscribe(`KAY/${position}/${department}`, (err) => {
    if (!err) console.log('subscribed to KAY/video');
    client.publish(`KAY/${position}/${department}`, department);
  });
  client.unsubscribe(`KAY/${position}/${department}`, (err) => {
    if (!err) console.log(`unsubscribe from KAY/${position}/${department}`);
  });
}

const actions = (action, payload, state) => {
  console.log('action bedore switch:', action)
  switch (action) {
    case "video":
      console.log('state.position:',state.position)
      let department = state.videoName;
      console.log("video:", department)
      const client = mqtt.connect('wss://test.mosquitto.org:8081');
      if (department) {
        if (department.includes("software")) {
          displayVideo(client, "software",state.position)
        }
        if (department.includes("industrial")) {
          displayVideo(client, "industrial",state.position)
        }
      }
      return `Welcome to ${state.position}`
      break;
    case "laser":
      console.log("Laser!!!");
      break;
    case "equipment":
      const text = getEquipment(payload)
      console.log("text in actions:", text);
      return text;
  }
};
module.exports = actions;
