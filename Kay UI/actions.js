const getEquipment = require("./googleActions/googleSheets");

const actions = (intent,payload) => {
  switch (intent) {
    case "wit_consent":
      console.log("get laser");
      break;
    case "wit_ready":
      console.log("Ready");
      break;
    case "wit_searchEquipment":
      const text =  getEquipment(payload)
      console.log("text in actions:",text);
      return text;
  }
};
module.exports = actions;
