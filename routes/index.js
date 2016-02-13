var express = require('express');
var rclient = require('restler');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var now = new Date();
    var time = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);
    res.render('index', { week: "Sunday", date: "February 14th", time: time });
});

module.exports = router;
