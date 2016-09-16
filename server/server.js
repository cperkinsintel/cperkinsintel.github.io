/*jshint node:true, esversion:6 */

/*
var express = require('express');

var app     = express();
//app.use(function(req, res, next){
//  setTimeout(function(){ next(); }, 2000);
//}).use(express.static('client'));

app.use(express.static('flasher'));

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});
*/

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