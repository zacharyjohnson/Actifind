const start = require('./Start/start');
const readlineSync = require('readline-sync');
var req;
var res;

while(true){
  req = readlineSync.question("");
  res = start.handleMessage(req);
  console.log(res);
}
