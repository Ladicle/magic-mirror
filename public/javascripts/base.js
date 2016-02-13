$(function(){
    // Update Clock
    setInterval(function() {
	var now = new Date();
	var timeMsg = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);
	$('#time').html(timeMsg);
    }, 1000);

    // Update messages
    createConnection();
});

function createConnection() {
    var socket = io('http://localhost:9090/');
    socket.on('connect', function () {
	socket.send('hi');
	
	socket.on('message', function (msg) {
	    if (msg) {
          	$('.message').html(msg.replace(/\n/g, "<br>"));
	    }
	});
    });
}
