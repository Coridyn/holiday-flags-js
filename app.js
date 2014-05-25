var _ = require('lodash');

var lightUtil = require('./lightUtil'),
	defaultFlags = require('./defaultData'),
	server = require('./server/server');

var flagsMap = {};
_.forEach(defaultFlags, function(item) {
	flagsMap[item.name] = item.name;
});

// TODO: Read this from an argument.
var hasMongoose = false;
try {
	require.resolve('mongoose');
	hasMongoose = true;
} catch(e){
	
}

if (hasMongoose) {
	var MongoService = require('./server/mongoose.js')(server.getApp(), defaultFlags);
} else {
	var MongoService = require('./server/non-mongo.js')(server.getApp(), defaultFlags);
}

// Twitter
if (true) {
	var flagMap = {};
	_.forEach(defaultFlags, function(flagItem){
		flagMap[flagItem.name] = flagItem.lights;
	});;
	
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