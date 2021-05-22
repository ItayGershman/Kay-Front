const mqtt = require('mqtt')
const getEquipment = require("./googleActions/googleSheets");

const displayVideo = (client, department) => {
  client.subscribe(`KAY/${department}`, (err) => {
    if (!err) console.log('subscribed to KAY/video');
    client.publish(`KAY/${department}`, department);
  });
  client.unsubscribe(`KAY/${department}`, (err) => {
    if (!err) console.log(`unsubscribe from KAY/${department}`);
  });
}

const actions = (action, payload, state) => {
  console.log('action bedore switch:', action)
  switch (action) {
    case "video":
      let department = state.videoName;
      console.log("video:", department)
      const client = mqtt.connect('wss://test.mosquitto.org:8081');

      if (department.includes("software")) {
        displayVideo(client, "software")
      }
      if (department.includes("industrial")) {
        displayVideo(client, "industrial")
      }
      console.log("Video!!!!");
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
