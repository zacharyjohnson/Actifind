const readline = require('readline');
var admin = require("firebase-admin");
var stateDatabase;

var clubs = {
  "Indy Democrats":"The Democratic club of Marion County",
  "Indy Feminists":"Indiana's Feminist Collective.",
  "Indy Nerdfighters":"Your local source for all things Nerdfighters.",
  "United Way's Emergin Leaders":"Supporters of the United Way's many initiatives.",
  "stART: Arts for Learning":"Raise awareness for Arts for Learning."
}

admin.database.enableLogging(true);
var db = admin.database();

// Get a database reference to our blog

function findState(rl){
  return rl.question('Which state do you live in?\n');
}

function getInput(rl){
  return rl.question('');
}

function printStates(state, rl){

  stateDatabase.update({
    "hello":"fool"
  });
}

/*
function addStates(){
  var database = db.ref("states/Indiana");
  //console.log(database);
  var states = ['Indianapolis','Fort Wayne','Evansville','South Bend','Carmel','Bloogmington','Hammond','Gary','Lafayette','Columbus','Greensburg','Greenwood'];

  for (var i = 0; i < states.length; i++) {
    var state = states[i];
    var obj = {};
    var obj2 = {};
    var blank = "freaking hell"
    obj2[blank] = "";
    obj[state] = obj2;
    database.update(obj);
  }
}*/

function getInfoAtCurrentReference(callback){
  var cities = "";
  var query = stateDatabase.orderByKey();

  query.once("value")
    .then(function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time

        var key = childSnapshot.key;
        cities += (key + "\n");
        console.log(cities);
    });
    callback(cities);
  });

}

module.exports = {

  /*
    For when a city has been received through the text
  */
  gotCity: function(message, callback){
    stateDatabase.child(message);
    getInfoAtCurrentReference(function(message1){
      callback(message1);
    });
    callback("Indy Democrats\nIndy Feminists\nIndy Nerdfighters\nUnited Way's Emerging Leaders\nstART: Arts for Learning\n");
  },

  /*
    For when more information on a club is being sought
  */
  gotClub: function(message, callback){
    switch (message) {
      case "Indy Democrats":
        callback("Indy Democrats: " + clubs[message] + "\nWebsite: http://www.indydemocrats.com/\n");
        break;
      case "Indy Feminists":
        callback("Indy Feminists: " + clubs[message] + "\nWebsite: https://indyfeminists.wordpress.com/\n");
        break;
      case "Indy Nerdfighters":
        callback("Indy Nerdfighters: " + clubs[message] + ".\nWebsite: https://www.facebook.com/groups/293991550778046");
        break;
      case "United Way's Emerging Leaders":
        callback("Emerging Leaders: " + clubs[message] + "\nWebsite: http://www.uwci.org/emerging-leaders\n");
        break;
      case "stART: Arts for Learning":
        callback("stART: " + clubs[message] + "\nWebsite: https://artsforlearningindiana.org/about/start-young-professionals-board/\n");
        break;
      default:
        callback("Oops! Make sure you're spelling the names exactly");
        break;

    }
  },

  /*
    For when a confirmation to the club has been received
  */
  gotConfirmation: function(){

  },

  /*
    For when a person wants to creat a group
  */
  gotCreateGroup: function(){

  },

  /*
    For when a request to send a notification is received
  */
  gotSendNotification: function(callback){
    callback("Hi, Women of Cinci! What would you like your message to say?");
  },

  gotState: function(message, callback){
    var reference  = "states/" + message;


    console.log(reference);
    stateDatabase = db.ref().child("states").child(message);
    getInfoAtCurrentReference(function(message1){
      console.log("we're in the reference");
        callback(message1);
    });
    callback("Indianapolis\nFort Wayne\nLafayette\nBloomington\nEvansville");
  },

  gotNotificationMessage: function(message, server, callback){
    server.sendMessage(message);
    callback("Awesome! Your message has been sent.");
  },

  gotJoin: function(){
    var message = "Cool! So you want to find a group in your area? Help us narrow it down a bit by telling us the state you're from.";
    return message;
  }


}
