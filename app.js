var countries = [];


// // Twitter Stream
var Twit = require('twit'),
	_ = require('lodash');

var T = new Twit({
	consumer_key: 'VfE0QYaKm2OcxXC1hXI7hg',
	consumer_secret: 'DsJfG1339jeiFCR5fKHvdezRlWYiWl7JaqJKaZGqe8',
	access_token: '452969037-X9vRwAUIH90Olpc4KzxXkWKtGiqbYaqC3P5TfT7Q',
	access_token_secret: 'ORZEC52kJ1z90MaOIK7dIIfAAyZ3Cd1bzD4XIArIcPA'
});

var flagsMap = {
	'usa': 'usa',
	'australia': 'australia',
	'brazil': 'brazil',
	'newzealand': 'newzealand',
	'thailand': 'thailand',
	'argentina': 'argentina'
};

var track = _.map(flagsMap, function(value, key) {
	return '#' + key
});

var stream = T.stream('statuses/filter', {
	track: track
});

stream.on('tweet', function(tweet) {
	var hashtags = tweet.entities.hashtags;

	var hashtag = _.find(hashtags, function(hashtag) {
		return !!flagsMap[hashtag.text.toLowerCase()];
	});

	if (!hashtag) return;

	hashtag = hashtag.text.toLowerCase();

	console.log('hashtag', hashtag);

	var models = app.db.models,
		Flag = models.Flag;

	Flag.findOne({
		name: hashtag
	}, function(err, doc) {
		if (err) return;
		if (!doc) return;

		var flag = doc.lights;

		var flatFlag = [];
		flatFlag.push('#000000');

		for (var i = 0; i < flag.length; i++) {
			var row = flag[i].concat();

			if (i % 2 == 1) {
				row.reverse();
			}
			flatFlag = flatFlag.concat(row);
		}

		setLights(flatFlag);
	});
});

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
		name: 'usa',
		lights: [
			["#215bfc", "#fcfbf4", "#215bfc", "#fcfbf4", "#fe2600", "#fe2600", "#fe2600"],
			["#fcfbf4", "#215bfc", "#fcfbf4", "#215bfc", "#fcfbf4", "#fcfbf4", "#fcfbf4"],
			["#215bfc", "#fcfbf4", "#215bfc", "#fcfbf4", "#fe2600", "#fe2600", "#fe2600"],
			["#fcfbf4", "#215bfc", "#fcfbf4", "#215bfc", "#fcfbf4", "#fcfbf4", "#fcfbf4"],
			["#fe2600", "#fe2600", "#fe2600", "#fe2600", "#fe2600", "#fe2600", "#fe2600"],
			["#fcfbf4", "#fcfbf4", "#fcfbf4", "#fcfbf4", "#fcfbf4", "#fcfbf4", "#fcfbf4"],
			["#fe2600", "#fe2600", "#fe2600", "#fe2600", "#fe2600", "#fe2600", "#fe2600"]
		]
	}, {
		name: 'australia',
		lights: [
			["#f0edf0", "#f32800", "#f0edf0", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1"],
			["#f32800", "#ef6154", "#f32800", "#1d2ff1", "#0430f1", "#f0edf0", "#1d2ff1"],
			["#e9ecf0", "#f32800", "#e9ecf0", "#1d2ff1", "#f0edf0", "#1d2ff1", "#f0edf0"],
			["#0430f1", "#0430f1", "#0430f1", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1"],
			["#1d2ff1", "#fcfcf2", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#201d20", "#1d2ff1"],
			["#1d2ff1", "#f0edf0", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1136fc", "#1d2ff1"],
			["#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#faf6fc", "#1d2ff1"]
		]
	}, {
		name: 'brazil',
		'lights': [
			["#00f62b", "#00f62b", "#00f62b", "#fcea00", "#00f62b", "#00f62b", "#00f62b"],
			["#00f62b", "#00f62b", "#fcea00", "#fcea00", "#fcea00", "#00f62b", "#00f62b"],
			["#00f62b", "#fcea00", "#fcea00", "#0732fc", "#fcea00", "#fcea00", "#00f62b"],
			["#fcea00", "#fcea00", "#0732fc", "#0732fc", "#0732fc", "#fcea00", "#fcea00"],
			["#00f62b", "#fcea00", "#fcea00", "#0732fc", "#fcea00", "#fcea00", "#00f62b"],
			["#00f62b", "#00f62b", "#fcea00", "#fcea00", "#fcea00", "#00f600", "#00f62b"],
			["#00f62b", "#00f62b", "#00f62b", "#fcea00", "#00f62b", "#00f62b", "#00f62b"]
		]
	}, {
		name: 'newzealand',
		lights: [
			["#f0edf0", "#f32800", "#f0edf0", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1"],
			["#f32800", "#ef6154", "#f32800", "#1d2ff1", "#0430f1", "#fe2626", "#1d2ff1"],
			["#e9ecf0", "#f32800", "#e9ecf0", "#1d2ff1", "#fe2626", "#1d2ff1", "#fe2626"],
			["#0430f1", "#0430f1", "#0430f1", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1"],
			["#1d2ff1", "#1632fc", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1632fc", "#1d2ff1"],
			["#1d2ff1", "#1632fc", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1136fc", "#1d2ff1"],
			["#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#1d2ff1", "#fe2626", "#1d2ff1"]
		]
	}, {
		name: 'thailand',
		lights: [
			["#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000"],
			["#fcf7fa", "#fcf7fa", "#fcf7fa", "#f7f6fc", "#fcf7fa", "#fcf7fa", "#fcf7fa"],
			["#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd"],
			["#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd"],
			["#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd"],
			["#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa"],
			["#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000"]
		]
	}, {
		name: 'argentina',
		lights: [
			["#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000"],
			["#fcf7fa", "#fcf7fa", "#fcf7fa", "#f7f6fc", "#fcf7fa", "#fcf7fa", "#fcf7fa"],
			["#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd"],
			["#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd"],
			["#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd", "#0242fd"],
			["#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa", "#fcf7fa"],
			["#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000"]
		]
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