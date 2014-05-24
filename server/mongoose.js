var mongoose = require('mongoose');

var FlagSchema = new mongoose.Schema({
	name: {
		type: String
	},
	lights: Object
});

mongoose.model('Flag', FlagSchema);



module.exports = function(app, defaultFlags) {
	// Setup mongoose
	app.set('mongodb-uri', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/holiday-flights');
	app.db = mongoose.connect(app.get('mongodb-uri'));
	app.db.connection.on('error', console.error.bind(console, 'mongoose connection error: '));
	app.db.connection.once('open', function() {
		console.log('mongoose open for business');
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

	// Mongoose-specific references.
	app.get('/fixture', function(req, res) {
		var models = req.app.db.models,
			Flag = models.Flag;

		Flag.remove({}, function() {});
		Flag.create.apply(Flag, defaultFlags.concat([

			function(err) {
				if (err) return res.send(500);
				res.send(200);
			}
		]));
	});

	return {
		getFlag: function(flagId, callback) {
			var models = app.db.models,
				Flag = models.Flag;

			Flag.findOne({
				name: flagId
			}, callback);
		}
	}
}