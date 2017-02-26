var http = require('http');
var express = require('express');
var twilio = require('twilio');
var start = require('./Start/start');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message(start.handleMessage(req.body.Body, this));
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});

module.exports = {
  sendMessage: function(message){
    // Twilio Credentials
    var accountSid = 'AC819f94c6a1fa73207a82508e3124ef9c';
    var authToken = '3c38dc2f8a668d83b20dc04aed1711b3';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: "+18125938190",
        from: "+13174015068",
        body: message,
      }, function(err, message) {
        console.log(message.sid);
    });
  }
}
