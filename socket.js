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
});

// Detect
app.get('/detect', function(req, res, next) {
    console.log('detected!');
    io.sockets.emit('message', { message: 'User Searching...' });
});

// Login
app.get('/login', function(req, res, next) {
    var user = req.query.user;
    console.log('login:' + user);

    var message = switch(user){
    case 'aya':
	return "Today Schedule\n9:00 Finish Hackathon!\n 12:00 Have a lunch.\n14:00 Sleeeeeep.";
    case 'ryu':
	return "Today Schedule\n7:00 Lastspart coding.\n 09:00 Finish all tasks.\n13:00 Rest.";
    else
	return "Please login.";    
    }

    console.log(message)
    //io.sockets.emit('message', { message: 'User Searching...' });
    res.send(message);
});

// Logout
app.get('/logout', function(req, res, next) {
    console.log('logout');
    io.sockets.emit('message', { message: 'Not Logined.' });
});

// Socket IO
io.sockets.on('connection', function(socket) {
  console.log("connection");

  // メッセージを受けたときの処理
  socket.on('message', function(data) {

    console.log("message");
  });

  // クライアントが切断したときの処理
  socket.on('disconnect', function(){
    console.log("disconnect");
  });
});


// Events
events.on('push', function(sended) {
    console.log('event sendされました！'+ sended.value.event );
    // hair
    io.sockets.emit('message', { event: 'hat' });
});
