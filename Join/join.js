const readline = require('readline');
var admin = require("firebase-admin");


// Get a database reference to our blog
var db = admin.database();

function findState(rl){
  return rl.question('Which state do you live in?\n');
}

function printStates(state, rl){
  var reference  = "states/" + state;
  console.log(reference);
  var stateDatabase = db.ref(reference);
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

function printState(rl){
  ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
}

module.exports = {
  joinGroup: function(rl){

    var state = findState(rl);
    console.log('Awesome! ' + state + ' is a great place to call home!\nWhich of these cities do you live closest to?\n');
    printStates(state, rl);

  }
}
