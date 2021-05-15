const mqtt = require('mqtt')
const getEquipment = require("./googleActions/googleSheets");

const actions = (action, payload) => {
  console.log('action bedore switch:', action)
  switch (action) {
    case "video":
      const client = mqtt.connect('wss://test.mosquitto.org:8081');
      client.subscribe('KAY/video', (err) => {
        if (!err) console.log('subscribed to KAY/video');
        client.publish('KAY/video', 'software');
      });
      client.unsubscribe('KAY/video', (err) => {
        if (!err) console.log('unsubscribe from KAY/video');
      });
      console.log("Video!!!!");
      break;
    case "wit_ready":
      console.log("Ready");
      break;
    case "wit_searchEquipment":
      const text = getEquipment(payload)
      console.log("text in actions:", text);
      return text;
  }
};
module.exports = actions;
