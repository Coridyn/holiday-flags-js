// var Twit = require('twit')

// var T = new Twit({
// 	consumer_key: 'VfE0QYaKm2OcxXC1hXI7hg',
// 	consumer_secret: 'DsJfG1339jeiFCR5fKHvdezRlWYiWl7JaqJKaZGqe8',
// 	access_token: '452969037-X9vRwAUIH90Olpc4KzxXkWKtGiqbYaqC3P5TfT7Q',
// 	access_token_secret: 'ORZEC52kJ1z90MaOIK7dIIfAAyZ3Cd1bzD4XIArIcPA'
// });

// var stream = T.stream('statuses/filter', {
// 	track: ['#brazil', '#usa', '#japan', '#australia']
// })

// stream.on('tweet', function(tweet) {
// 	console.log(tweet.text);
// });

var express = require('express'),
	http = require('http');

var app = express(),
	port = 3000;

app.use(express.bodyParser());

app.post('/lights', function(req, res) {
	var flags = {
		lights: req.body.flag
	};

	flags = JSON.stringify(flags);

	var lightRequest = http.request({
			host: '192.168.23.254',
			path: '/iotas/0.1/device/moorescloud.holiday/localhost/setlights',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Content-Length': flags.length
			}
		},
		function(lightResponse) {
			lightResponse.on('data', function(data) {
				res.send(200, data);
			});
		});

	lightRequest.on('error', function(e) {
		res.send(500, e);
	});

	lightRequest.write(flags);
	lightRequest.end();
});

var server = http.createServer(app).listen(port, function() {
	console.log('Express server listening on port ' + port);
});



// [ ][ ][ ][x][ ][ ][ ]
// [ ][ ][x][ ][x][ ][ ]
// [ ][x][ ][o][ ][x][ ]
// [x][ ][o][o][o][ ][x]
// [ ][x][ ][o][ ][x][ ]
// [ ][ ][x][ ][x][ ][ ]
// [ ][ ][ ][x][ ][ ][ ]

// [.][x][.][x][ ][ ][ ]
// [x][.][x][.][=][=][=]
// [.][x][.][x][ ][ ][ ]
// [x][.][x][.][=][=][=]
// [ ][ ][ ][ ][ ][ ][ ]
// [=][=][=][=][=][=][=]
// [ ][ ][ ][ ][ ][ ][ ]
// [=][=][=][=][=][=][=]