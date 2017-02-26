const readline = require('readline');
var admin = require("firebase-admin");
var stateDatabase;

// Get a database reference to our blog
var db = admin.database();

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

function addStates(){
  var database = db.ref("states/Indiana");

  var states = ['Indianapolis','Fort Wayne','Evansville','South Bend','Carmel','Bloogmington','Hammond','Gary','Lafayette','Columbus'];

  for (var i = 0; i < states.length; i++) {
    var state = states[i];
    var obj = {};
    var obj2 = {};
    var blank = "test"
    obj2[blank] = "";
    obj[state] = obj2;
    database.update(obj);
  }
}

function getInfoAtCurrentReference(callback){
  var cities = "";
  var query = stateDatabase.orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time

        var key = childSnapshot.key;
        cities += (key + "\n");
    });
    callback(cities);
  });

}

module.exports = {

  /*
    For when a city has been received through the text
  */
  gotCity: function(){

  }

  /*
    For when more information on a club is being sought
  */
  gotClub: function(){

  }

  /*
    For when a confirmation to the club has been received
  */
  gotConfirmation: function(){

  }

  /*
    For when a person wants to creat a group
  */
  gotCreateGroup: function(){

  }

  /*
    For when a request to send a notification is received
  */
  gotSendNotification: function(){

  }

  gotState: function(rl){

    var state = findState(rl);
    var reference  = "states/" + state;
    console.log(reference);
    stateDatabase = db.ref(reference);
    console.log('Awesome! ' + state + ' is a great place to call home!\nWhich of these cities do you live closest to?\n');
    getInfoAtCurrentReference(function(cities){
      console.log(cities);
      var city = getInput(rl);
      stateDatabase = stateDatabase.child(city);
      getInfoAtCurrentReference(function(groups){
        console.log("\nHere are some groups in your area!\nType one of their names to find out more info on them\n" + groups);
        var group = getInput(rl);
      })
    });



  }
}
