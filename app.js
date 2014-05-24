var _ = require('lodash');

var lightUtil = require('./lightUtil'),
	defaultFlags = require('./defaultData'),
	server = require('./server/server');

var flagsMap = {};
_.forEach(defaultFlags, function(item) {
	flagsMap[item.name] = item.name;
});

// TODO: Read this from an argument.
if (true) {
	var MongoService = require('./server/mongoose.js')(server.getApp(), defaultFlags);
}

// Twitter
if (true) {
	var TwitterService = require('./server/twitter');

	TwitterService(flagsMap, function(flagId) {
		// TODO: Map the flagId to array of colours.
		MongoService.getFlag(flagId, function(err, doc) {
			if (err) return;
			if (!doc) return;

			// Render the flag.
			lightUtil(doc.lights);
		});
	});
}

server.start();