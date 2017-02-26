// start/start.js
const readlineSync = require('readline-sync');

// Import Admin SDK


var hasInitialCommand = false;  // Track if an initial command has been received
var hasJoin = false;            // Track if a Join message has been received
var hasState = false;           // Track if a state has been received
var hasCity = false;            // Track if a city has been received
var hasNotify = false;
var hasUpdate = false;
var hasCreate = false;
var createNumber = 1;
var hasClub = false;            // Track if a specific club has been received
var hasCreateReady = false;

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
  hasNotify = false;
  hasUpdate = false;
  hasCreate = false;
  hasCreateReady = false;
  createNumber  = 0;
}

function handleMessage(message, server){

  var lowerCase = message.toLowerCase();
  switch (lowerCase) {
    case "join":


      setAllToFalse();
      hasJoin = true;
      hasInitialCommand = true;
      return join.gotJoin();

      break;
    case "create":

      setAllToFalse();
      var message1 = null;
      hasCreate = true;
      createNumber = 0;
      join.gotCreateGroup(function(reply){
        message1 = reply;
      });
      hasState = false;
      return message1;
      break;
    case "help":
      return help();
      break;
    case "update":
      var message1 = null;
      setAllToFalse();
      hasUpdate = true;
      join.gotUpdate(function(reply){
        message1 = reply;
      });
      return message1;
      break;
    case "notify":
      setAllToFalse();
      var message1 = null;
      hasNotify = true;
      join.gotSendNotification(function(reply){
        message1 = reply;
      });
      while (message1 == null){

      }
      return message1;
      break;
    default:
      if((hasJoin || hasCreate) && !hasCreateReady && createNumber == 0){
        if (hasClub){
        } else if (hasCity && !hasCreate){
          if (lowerCase == "yes"){
            return "Okay, cool! We've added you to the text list for the club, so you'll receive a text when the club sends them."
          } else if (lowerCase == "no"){
            return "Okay! Reply with another name if you're interested in another club."
          } else {
            var message1 = null;
            join.gotClub(message, function(reply){
              message1 = reply + "Do you want to join this club? (yes/no)\n"
            })

            while (message1 == null){

            }

            return message1;
          }
        } else if (hasState && !hasCreateReady){
          var message2 = null;
          join.gotCity(message, function(reply){
            hasCity = true;
            if (!hasJoin){
              hasCreateReady = true;
              createNumber = 1;
            }

            if (hasCreate){
              message2 = message + ", a great city! What is the name of your group?";
            } else {
              message2 = message + ", a great city! Here are some local groups:\n" + reply;
              if (reply != "It looks like there aren't any groups yet! Be the first") {
                message2 += "Reply with the name of a group for more information";
              }
            }
          });
          return message2;
        } else if (!hasCreateReady){
          console.log("Got here");
          if (isState(lowerCase)){
            var message2 = null;
            join.gotState(message, function(reply){
              hasState = true;

               message2 = "Which of these cities are you closest to?\n" + reply;
            }, function(){
              2+2;
            });

            while(message2 == null){

            }
            return message2;
          } else {
            return ("Please make sure you've spelled your state's name correctly");
          }
        }
      } else if(hasNotify){
        var message1 = null;
        join.gotNotificationMessage(message, server, function(reply){
          message1 = reply;
        })

        while(message1 == null){

        }
        return message1;
      } else if (hasUpdate){
        var group = "Women of Cinci";
        var message1 = null;
        join.updateDescription(group, message, function(reply){
          message1 = reply;
        });
        return message1;
      } else if (hasCreateReady) {
        console.log("got to hasCreateReady");
        var message2 = null;
          if(createNumber == 1){
            createNumber++;
            join.gotGroupName(message, function(reply){
              message2 = reply;
            })
          } else if (createNumber == 2){
            createNumber++;
            join.gotGroupDescription(message, function(reply){
              message2 = reply;
            })
          } else if (createNumber == 3){
            createNumber++;
            join.gotGroupWebsite(message, function(reply){
              message2 = reply;
            })
          }

          return message2;
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
