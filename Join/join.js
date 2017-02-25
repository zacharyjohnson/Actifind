const readline = require('readline');
var admin = require("firebase-admin");
var stateDatabase;

// Get a database reference to our blog
var db = admin.database();

function findState(rl){
  return rl.question('Which state do you live in?\n');
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
  joinGroup: function(rl){

    var state = findState(rl);
    var reference  = "states/" + state;
    console.log(reference);
    stateDatabase = db.ref(reference);
    console.log('Awesome! ' + state + ' is a great place to call home!\nWhich of these cities do you live closest to?\n');
    getInfoAtCurrentReference(function(cities){
      console.log(cities);
    });

  }
}
