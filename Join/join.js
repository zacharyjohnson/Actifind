const readline = require('readline');
var admin = require("firebase-admin");
var stateDatabase;



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
  gotCity: function(){

  },

  /*
    For when more information on a club is being sought
  */
  gotClub: function(){

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
  gotSendNotification: function(){

  },

  gotState: function(message, callback){
    var reference  = "states/" + message;


    console.log(reference);
    stateDatabase = db.ref(reference);
    getInfoAtCurrentReference(function(message1){
      console.log("we're in the reference");
        callback("Indianapolis\nFort Wayne\nLafayette\nBloomington\nEvansville");
    });

  },

  gotJoin: function(){
    var message = "Cool! So you want to find a group in your area? Help us narrow it down a bit by telling us the state you're from.";
    return message;
  }


}
