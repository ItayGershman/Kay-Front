
const actions = (intent) => {
  switch (intent) {
    case "wit_consent":
      console.log("get laser");
      break;
    case "wit_ready":
      console.log("Ready");
      break;


  }
};
module.exports = actions;
