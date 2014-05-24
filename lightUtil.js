var http = require('http');

module.exports = setLights;

/*
Accept an array of up to 50 colours.
*/
function setLights(lights, res) {
	// Munge things into the correct order.
	lights = setLights.flattenFlag(lights);



	var data = {
		lights: lights
	};

	data = JSON.stringify(data);

	var lightRequest = http.request({
			host: '192.168.23.254',
			path: '/iotas/0.1/device/moorescloud.holiday/localhost/setlights',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Content-Length': data.length
			}
		},
		function(lightResponse) {
			lightResponse.setEncoding('utf-8');
			lightResponse.on('data', function(data) {
				if (res) return res.send(200, data);
				console.log(200, data);
			});
		});

	lightRequest.on('error', function(e) {
		if (res) return res.send(500, e);
		console.log(500, e);
	});

	lightRequest.write(data);
	lightRequest.end();
};

setLights.flattenFlag = function(flag) {
	var flatFlag = [];

	for (var i = 0; i < flag.length; i++) {
		var row = flag[i].concat();

		if (i % 2 == 1) {
			row.reverse();
		}
		flatFlag = flatFlag.concat(row);
	}

	while (flatFlag.length < 50) {
		flatFlag.unshift('#000000');
	}

	return flatFlag;
}