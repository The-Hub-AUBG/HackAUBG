// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var bodyParser = require("body-parser");
app.set('port',  process.env.PORT || 5000);
//Routing folders 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/js', express.static(path.join(__dirname, 'static','js')));
app.use('/css', express.static(path.join(__dirname, 'static','css')));
app.use('/img', express.static(path.join(__dirname, 'static','img')));

// Routing for pages
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'static','pages','index.html'));
});
app.get('/map', function(request, response) {
  response.sendFile(path.join(__dirname, 'static','pages','map.html'));
});
app.get('/preferences', function(request, response) {
  response.sendFile(path.join(__dirname, 'static','pages','preferences.html'));
});
app.get('/sign', function(request, response) {
  response.sendFile(path.join(__dirname, 'static','pages','sign.html'));
});
app.get('/user', function(request, response) {
  response.sendFile(path.join(__dirname, 'static','pages','user.html'));
});
app.get('*', function(request, response){
  response.sendFile(path.join(__dirname, 'static','pages','404.html'));
});

// Starting server
server.listen(app.get("port"), function() {
  console.log(`Starting server on port ${app.get("port")}`);
});
