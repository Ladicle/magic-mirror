var dgram = require('dgram');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var MilkCocoa = require('milkcocoa');

// MilkCocoa listeners
var milkcocoa = new MilkCocoa('leadikkwvben.mlkcca.com');
var events = milkcocoa.dataStore('events');
var users = milkcocoa.dataStore('users');

server.listen(9090);

app.get('/', function (req, res) {
    console.log('index');
    res.send('hello');
});

// Detect
app.get('/detect', function(req, res, next) {
    console.log('detected!');
    io.sockets.send('User Searching...');
    res.send('detected');
});

// Login
app.get('/login', function(req, res, next) {
    var user = req.query.user;
    console.log('login:' + user);

    var message = "Please login.";
    switch(user){
    case 'aya':
	message = "● 09:00 Finish Hackathon!\n● 12:00 Have a lunch.\n● 14:00 Sleeeeeep.";
	break;
    case 'ryu':
	message= "● 07:00 Lastspart coding\n● 09:00 Finish all tasks.\n● 13:00 Rest.";

	break;
    }

    console.log(message)
    io.sockets.send(message);
    res.send(message);
});

// Logout
app.get('/logout', function(req, res, next) {
    console.log('logout');
    io.sockets.send('Not Logined.');
    res.send('logout');
});

// Socket IO
io.sockets.on('connection', function(socket) {
  console.log("connection");

  // メッセージを受けたときの処理
  socket.on('message', function(data) {

      console.log("message" + data);
  });

  // クライアントが切断したときの処理
  socket.on('disconnect', function(){
    console.log("disconnect");
  });
});
