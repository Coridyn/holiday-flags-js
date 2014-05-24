// Express Server
var http = require('http'),
	express = require('express'),
	lightUtil = require('../lightUtil');


var app = express(),
	port = 3000;

app.use(express.bodyParser());

app.post('/lights', function(req, res) {
	lightUtil(req.body.flag, res);
});

module.exports = {
	getApp: function() {
		return app;
	},

	start: function() {
		var server = http.createServer(app).listen(port, function() {
			console.log('Express server listening on port ' + port);
		});

		return server;
	}
}