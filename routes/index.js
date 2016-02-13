var express   = require('express');
var rclient   = require('restler');
var MilkCocoa = require('milkcocoa');
var router    = express.Router();

// GET home page
router.get('/', function(req, res, next) {
    var now = new Date();
    var time = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);
    res.render('index', { week: "Sunday", date: "February 14th", time: time });
});

module.exports = router;

// MilkCocoa listeners
var milkcocoa = new MilkCocoa('leadikkwvben.mlkcca.com');
var events = milkcocoa.dataStore('events');
var users = milkcocoa.dataStore('users');

// Events
events.on('push', function(sended) {
  console.log('event sendされました！titleは'+sended);
});

// User
users.on('push', function(sended) {
  console.log('user sendされました！titleは'+sended);
});
