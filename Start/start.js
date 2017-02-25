// start/start.js

const readline = require('readline');
// Import Admin SDK
var admin = require("firebase-admin");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var cities = ['Indianapolis','Fort Wayne','Evansville','South Bend','Carmel','Bloogmington','Hammond','Gary','Lafayette','Columbus'];
rl.question('Welcome to Communifind! For help, respond with \'help\'', (response) => {
  switch (response) {
    case "Join":

      const join = require("../Create/index.js");
      join.f();

      break;
    case "Create":

      break;
    case "Help":
      help();
      break;
    case "Update":
      break;
    case "Message":
      break;
    default:
      console.log("Oops! Looks like that's not a valid command :/");
      help();
  }

  rl.close();
});

var help = function (){
  console.log("Possible commands include:\nJoin - Search for and join local community groups\nCreate - Add your group to the list for others to find\nUpdate - Update your group's description\nMessage - Send a message to all users associated with your group");
}
