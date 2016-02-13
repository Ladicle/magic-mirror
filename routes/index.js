var express   = require('express');
var rclient   = require('restler');
var MilkCocoa = require('milkcocoa');
var google    = require('googleapis');
var router    = express.Router();

// GET home page
router.get('/', function(req, res, next) {
    var now = new Date();
    var time = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);
    res.render('index', { week: "Sunday", date: "February 14th", time: time });
});

// Auth redirect
router.get('/auth', function(req, res, next) {
    console.log('redirect');
});

module.exports = router;

// Google account settings
var clientID = '714461968364-8ql5e5addflq8e0feudsr6k3humjp87d.apps.googleusercontent.com';
var clientSecret = 'EPKIbzKqYFDzElbt-eJOadoa';
var redirectURL = 'http://localhost:8080/auth';
var oauth = new google.auth.OAuth2(clientID, clientSecret, redirectURL);
var calendar = google.calendar('v3');

function getAccessToken(code, callback) {
    oauth.getToken(code, function(err, tokens) {
	console.log(tokens);
	if (err) {
	    console.log(err);
	} else {
	    oauth.setCredentials(tokens);
	    callback(oauth);
	}
    });
}

// MilkCocoa listeners
var milkcocoa = new MilkCocoa('leadikkwvben.mlkcca.com');
var users = milkcocoa.dataStore('users');

// User
users.on('push', function(sended) {
  console.log('user sendされました！titleは'+sended);
    getAccessToken(sended.value.code, function(oauth){
	calendar.events.list({
	    auth: oauth,
	    calendarId: 'primary',
	    timeMin: (new Date()).toISOString(),
	    maxResults: 5,
	    singleEvents: true,
	    orderBy: 'startTime'

	}, function(err, response) {
	    if (err) {
		console.log('The API returned an error: ' + err);
		return;
	    }
	    var events = response.items;
	    if (events.length == 0) {
		console.log('No upcoming events found.');

	    } else {
		console.log('Upcoming 10 events:');

		for (var i = 0; i < events.length; i++) {
		    var event = events[i];
		    var start = event.start.dateTime || event.start.date;
		    console.log('%s - %s', start, event.summary);
		}
	    }
	});
    });
});
