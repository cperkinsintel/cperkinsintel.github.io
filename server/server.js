/*jshint node:true, esversion:6 */

/*
  This demonstrates using an HTTP server on localhost and fielding AJAX responses from 
  a client.
  
  Pretty simple. 

*/

/* -------------------
    SETUP HTTP WEB SERVER
   ------------------- */

var http_or_https = 'http';

var express = require('express');
var app     = express();

var http  = require('http');

var httpServer = http.createServer(app);

if(http_or_https == 'http'){
  httpServer.listen(3001, function () {
    console.log('Example HTTP app listening on port 3001!');
  });
}


/* -------------------
    HTTPS
   ------------------- */
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  /*
  requestCert: false,
  rejectUnauthorized:false,
  ca:[]
  */
};

var httpsServer = https.createServer(options, app);
if(http_or_https == 'https'){
  httpsServer.listen(3001, function () {
    console.log('Example HTTPS app listening on port 3001!');
  });
}


/* -------------------
    CORS middleware
    
    the Access-Control-Allow-Origin makes sure that only 
    OUR cloud tool can reach the local webserver for Ajax calls.
   ------------------- */
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://cperkinsintel.github.io');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);
app.use(express.static('flasher'));

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});


/* -------------------
   RESPOND and VERIFY ORIGIN

  This request is made by the client via Ajax. The Access-Control-Allow-Option above 
  will ensure that this request only comes from the correct referrer.
  
  BUT - if an attacker were to bind in via a <script> declaration, the browser won't check.  
  
  Therefore, we ALWAYS check origin ourselves.
  
  Q: can the maker of the Ajax call change that header?
   ------------------- */
app.get('/hi', function (req, res) {
  if(req.get('Origin') == 'https://cperkinsintel.github.io'){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({a:4, b:[10,20,30], c:"HIhA BUDDY", d:req.get('Origin'), e:"Access Successfully Controllled"}));
  }else{
    res.status(500).json({error:"disallowed"});
  }
});

app.get('/fish.jpg', function(req, res){
  console.log("Origin when requesting Fish", req.get('Origin')); //undefined
  res.setHeader('Content-Type', 'image/jpeg');
  res.send('');
});


/* -------------------
   SERVE JS WITHOUT VERIFYING ORIGIN
   
    Unlike the Ajax request, a resource requested by <script> tag does NOT include
    an Origin or Referrer in the request header. 
    Additionally, resources requested by <script> are not subjectd ot Access-Control-Allow-Origin.
    
    Therefore, this type of communication should be avoided, or only used to serve supporting JS
    
    All actions in this handler should be secure (no file access, etc.)
   ------------------- */
app.get('/comm1.js', function (req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.send('function forest(){ console.log("Served to All. No Access Origin control.");}  forest();');
});


/* -------------------
    SOCKET.IO websockets
   ------------------- */
var socketio = require('socket.io');
var io       = socketio(httpServer);

io.on('connection', function(socket){
  console.log('connection received from a client');
  //give the connected client the news.
  socket.emit("news", {latest:"man landed on moon"});
  
  //if client says hello
  socket.on("hello", function(d/*, ack */){
    console.log("a client says", d);
    //ack({reply:"hello back at ya"});
  });
});