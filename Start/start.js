// start/start.js
const readlineSync = require('readline-sync');

// Import Admin SDK


var hasInitialCommand = false;  // Track if an initial command has been received
var hasJoin = false;            // Track if a Join message has been received
var hasState = false;           // Track if a state has been received
var hasCity = false;            // Track if a city has been received
var hasClub = false;            // Track if a specific club has been received

var states = ['alabama','alaska','american samoa','arizona','arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const join = require('../Join/join');

for (var i = 0; i < states.length; i++) {
  states[i] = states[i].toLowerCase();
}

// Determine if a message is a state
// TODO - update so that the list is in all lowercase
function isState(message){
  console.log(states.indexOf('' + message) + ' ' + message);
  if (states.indexOf(message) != -1){
    return true;
  } else {
    return false;
  }
}

function setAllToFalse(){
  hasInitialCommand = false;
  hasJoin = false;
  hasState = false;
  hasCity = false;
  hasClub = false;
}

function handleMessage(message){

  var lowerCase = message.toLowerCase();
  console.log(message);
  switch (lowerCase) {
    case "join":


      setAllToFalse();
      hasJoin = true;
      hasInitialCommand = true;
      return join.gotJoin();

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
    console.log("Maybe?");
      if(hasJoin){
        console.log("Hello");
        if (hasClub){
          console.log("1");
        } else if (hasCity){
          console.log("2");
        } else if (hasState){
          console.log("3");
        } else {
          console.log("We're in the right general area");
          if (isState(lowerCase)){
            var message2 = null;
            console.log("it's a state, my boy");
            join.gotState(message, function(reply){
              hasState = true;

               message2 = "Which of these cities are you closest to?\n" + reply;
            });

            while(message2 == null){

            }
            return message2;
          } else {
            return ("Please make sure you've spelled your state's name correctly");
          }
        }
      } else {
        return ("Oops! Looks like that's not a valid command :/\n") + help();

      }
  }
}

//var task = readlineSync.question('Welcome to Communifind! For help, respond with \'help\', otherwise type your command\n');









function help (){
  return ("Possible commands include:\nJoin - Search for and join local community groups\nCreate - Add your group to the list for others to find\nUpdate - Update your group's description\nNotify - Send a message to all users associated with your group\n");
}
module.exports.handleMessage = handleMessage
