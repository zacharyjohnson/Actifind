const readline = require('readline');
var admin = require("firebase-admin");



const start = require("../Start/start");

// Get a database reference to our blog
var db = admin.database();

function findState(rl){
  rl.close();
}

module.exports = {
  joinGroup: function(rl){
    findState(rl);
  }
}
