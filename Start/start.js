// start/start.js
const readlineSync = require('readline-sync');
// Import Admin SDK

function handleMessage(message){
  switch (message) {
    case "Join":

      const join = require('../Join/join');
      join.joinGroup(readlineSync);

      break;
    case "Create":
      console.log('2');
      break;
    case "Help":
      help();
      break;
    case "Update":
      console.log('3');
      break;
    case "Message":
      break;
    default:
      return ("Oops! Looks like that's not a valid command :/\n") + help();
  }
}

//var task = readlineSync.question('Welcome to Communifind! For help, respond with \'help\', otherwise type your command\n');









function help (){
  return ("Possible commands include:\nJoin - Search for and join local community groups\nCreate - Add your group to the list for others to find\nUpdate - Update your group's description\nMessage - Send a message to all users associated with your group\n");
}
module.exports.handleMessage = handleMessage
