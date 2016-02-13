"use strict";

var CLIENT_ID = '714461968364-8ql5e5addflq8e0feudsr6k3humjp87d.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly", "profile"];
var milkcocoa = new MilkCocoa('leadikkwvben.mlkcca.com');
var ds = milkcocoa.dataStore('events');

function checkAuth() {
  gapi.auth.authorize({
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'response_type': 'code token',
    'immediate': true
  }, handleAuthResult);
}

function handleAuthResult(authResult) {
  gapi.client.load('oauth2', 'v2', function () {
    gapi.client.oauth2.userinfo.get().execute(function (user) {
      var id = user.id;
      var email = user.email;
      var name = user.given_name;
      var code = authResult.code;

      // Send to milkcocoa
      ds.push({ 'user': { 'id': id, 'email': email, 'name': name, 'code': code } });
      $('.nickname').text(name);
    });
  });

  if (authResult && !authResult.error) {
    // Logined
    changeMode('detect');
  } else {
    // Show login buttion
    changeMode('login');
  }
}

function handleAuthClick() {
  gapi.auth.authorize({ client_id: CLIENT_ID, scope: SCOPES, immediate: false }, handleAuthResult);
  return false;
}

$(function () {
  // Login
  $('.login').click(function () {
    handleAuthClick();
  });

  // Send events
  $('.reaction').click(function () {
    ds.push({ event: $(this).value });
  });
});

// Change mode
function changeMode(mode) {
  document.getElementsByClassName('showing')[0].classList.remove('showing');
  document.getElementsByClassName(mode)[0].classList.add('showing');
}