var countries = [];


// // Twitter Stream
var Twit = require('twit'),
	_ = require('lodash');

// var T = new Twit({
// 	consumer_key: 'VfE0QYaKm2OcxXC1hXI7hg',
// 	consumer_secret: 'DsJfG1339jeiFCR5fKHvdezRlWYiWl7JaqJKaZGqe8',
// 	access_token: '452969037-X9vRwAUIH90Olpc4KzxXkWKtGiqbYaqC3P5TfT7Q',
// 	access_token_secret: 'ORZEC52kJ1z90MaOIK7dIIfAAyZ3Cd1bzD4XIArIcPA'
// });

// var flagsMap = {
// 	'brazil': ['']
// };

// var track = _.map(flagsMap, function(value, key) {
// 	return '#' + key
// });

// var stream = T.stream('statuses/filter', {
// 	track: track
// });

// stream.on('tweet', function(tweet) {
// 	var flag;

// 	var hashtags = tweet.entities.hashtags;
// 	console.log('hashtags', hashtags);

// 	_.find(hashtags, function(hashtag) {
// 		flag = flagsMap[hashtag.text.toLowerCase()];
// 		return !!flag;
// 	});

// 	setLights(flag);
// });


// Express Server
var express = require('express'),
	http = require('http'),
	mongoose = require('mongoose');

var app = express(),
	port = 3000;

// Setup mongoose
app.set('mongodb-uri', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/holiday-flights');
app.db = mongoose.connect(app.get('mongodb-uri'));
app.db.connection.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.connection.once('open', function() {
	console.log('mongoose open for business');
});

app.use(express.bodyParser());

app.post('/lights', function(req, res) {
	setLights(req.body.flag, res);
});

app.put('/flag', function(req, res) {
	var models = req.app.db.models,
		Flag = models.Flag;

	var name = req.body.name,
		lights = req.body.lights;

	Flag.findOneAndUpdate({
			name: name
		}, {
			lights: lights
		},
		function(err, doc) {
			if (err) return res.send(500, err);
			res.send(200, doc);
		});

});

app.get('/flags', function(req, res) {
	var models = req.app.db.models,
		Flag = models.Flag;

	Flag.find({}, function(err, doc) {
		if (err) res.send(500, err);
		res.send(200, doc);
	});
});

app.get('/fixture', function(req, res) {
	var models = req.app.db.models,
		Flag = models.Flag;

	Flag.remove({}, function() {});
	Flag.create({
		name: 'USA'
	}, {
		name: 'Australia'
	}, {
		name: 'Brazil'
	}, {
		name: 'New Zealand'
	}, function(err) {
		if (err) return res.send(500);
		res.send(200);
	})
});

var FlagSchema = new mongoose.Schema({
	name: {
		type: String
	},
	lights: Object
});

mongoose.model('Flag', FlagSchema);

var server = http.createServer(app).listen(port, function() {
	console.log('Express server listening on port ' + port);
});



// Set lights
var setLights = function(lights, res) {
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