const CLIENT_ID = '714461968364-8ql5e5addflq8e0feudsr6k3humjp87d.apps.googleusercontent.com';
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly", "profile"];
const milkcocoa = new MilkCocoa('leadikkwvben.mlkcca.com');
const events = milkcocoa.dataStore('events');
const users = milkcocoa.dataStore('users');

function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'response_type': 'code token',
      'immediate': true,
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
   gapi.client.load('oauth2', 'v2', function(){
      gapi.client.oauth2.userinfo.get().execute(function(user){
	  var id = user.id;
	  var email = user.email;
	  var name = user.given_name;
	  var code = authResult.code;

	  // Send to milkcocoa
	  users.push({id: id, email: email, name: name, code: code }, function(err, value){
	    console.log(value);
	});
	  $('.nickname').text(name);
      });
   });
    
  if (authResult && !authResult.error) {
    // Logined
    changeMode('detect')
  } else {
    // Show login buttion
    changeMode('login')
  }
}

function handleAuthClick() {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

$(function(){
    // Login
    $('.login').click(function(){
	handleAuthClick();
    });

    // Send events
    $('.reaction').click(function(){
	events.push({event: $(this).value}, function(err, value){
	    console.log(value);
	});
    });
})

// Change mode
function changeMode(mode){
  document.getElementsByClassName('showing')[0].classList.remove('showing');
  document.getElementsByClassName(mode)[0].classList.add('showing');
}
