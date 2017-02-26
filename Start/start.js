// start/start.js
const readlineSync = require('readline-sync');
// Import Admin SDK


var hasInitialCommand = false;  // Track if an initial command has been received
var hasJoin = false;            // Track if a Join message has been received
var hasState = false;           // Track if a state has been received
var hasCity = false;            // Track if a city has been received
var hasClub = false;            // Track if a specific club has been received

var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];


// Determine if a message is a state
// TODO - update so that the list is in all lowercase
function isState(message){
  if (states.contains(message)){
    return true;
  } else {
    return false;
  }
}

function handleMessage(message){

  message = message.toLowerCase();
  switch (message) {
    case "join":

      const join = require('../Join/join');
      join.joinGroup(readlineSync);

      break;
    case "create":

      break;
    case "help":
      return help();
      break;
    case "update":
      break;
    case "notify":
      break;
    default:
      return ("Oops! Looks like that's not a valid command :/\n") + help();
  }
}

//var task = readlineSync.question('Welcome to Communifind! For help, respond with \'help\', otherwise type your command\n');









function help (){
  return ("Possible commands include:\nJoin - Search for and join local community groups\nCreate - Add your group to the list for others to find\nUpdate - Update your group's description\nNotify - Send a message to all users associated with your group\n");
}
module.exports.handleMessage = handleMessage
