/*jshint node:true, esversion:6 */


var express = require('express');
var app     = express();

var https = require('https');
var http  = require('http');
var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

//var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app);

//app.use(function(req, res, next){
//  setTimeout(function(){ next(); }, 2000);
//}).use(express.static('client'));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);
app.use(express.static('flasher'));

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/hi', function (req, res) {
  res.send('HIYA BUDDY!');
});

app.get('/comm1.js', function (req, res) {
  res.send('function forest(){ console.log("Forestry");}  forest();');
});

/*app.*/ httpServer.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});


/*
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(3001);
*/