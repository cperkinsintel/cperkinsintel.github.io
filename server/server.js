/*jshint node:true, esversion:6 */

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