
module.exports = function(app, defaultFlags) {
	// Setup mongoose
	// app.put('/flag', function(req, res) {
	// 	var models = req.app.db.models,
	// 		Flag = models.Flag;

	// 	var name = req.body.name,
	// 		lights = req.body.lights;

	// 	Flag.findOneAndUpdate({
	// 			name: name
	// 		}, {
	// 			lights: lights
	// 		},
	// 		function(err, doc) {
	// 			if (err) return res.send(500, err);
	// 			res.send(200, doc);
	// 		});

	// });

	app.get('/flags', function(req, res) {
		res.send(200, defaultFlags);
	});

	// Mongoose-specific references.
	app.get('/fixture', function(req, res) {
		res.send(200);
	});

	return {
		getFlag: function(flagId, callback) {
			callback(null, defaultFlags[flagId]);
		}
	}
}