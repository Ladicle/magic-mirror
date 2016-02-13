function add_allow_header( $headers ) {
    global $wp;
    if (preg_match ('/wp-json/',$wp->request)) {
        $headers['Access-Control-Allow-Origin'] = '*';
        $headers['Access-Control-Allow-Credentials'] = 'true';
        return $headers;
    }
}
add_filter( 'wp_headers', 'add_allow_header' );

$(function(){
    weatherAPI = "http://weather.livedoor.com/forecast/webservice/json/v1?city=130010/"
    $.getJSON(weatherAPI, function(data){
	alert(json.forecasts[0].telop)
	
    });
});
