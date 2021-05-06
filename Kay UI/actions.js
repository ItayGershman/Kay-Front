const actions = (intent) => {
  switch (intent) {
    case "wit_consent":
      console.log("get laser");
    case "wit_ready":
      console.log("Ready");
  }
};
module.exports = actions;
