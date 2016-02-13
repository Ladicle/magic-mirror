"use strict";

$(function () {
    $.getJSON("http://weather.livedoor.com/forecast/webservice/json/v1?city=130010", function (json) {
        alert(json.forecasts[0].telop);
    });
});