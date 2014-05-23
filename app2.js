var http = require('http');

var lightRequest = http.request({
	hostname: '192.168.23.254',
	path: '/device/light/setlights',
	method: 'PUT'
}, function(lightResponse) {
	lightResponse.setEncoding('utf8');
	lightResponse.on('data', function(data) {
		console.log(data);
	});
});

lightRequest.on('error', function(e) {
	console.log(e);
});

lightRequest.write('{"lights":["#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#00f62b","#000000"]}');
lightRequest.end();