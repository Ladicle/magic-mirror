$(function(){
    // Update Clock
    setInterval(function() {
	var now = new Date();
	var timeMsg = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);
	$('#time').html(timeMsg);
    }, 1000);
});
