// Twitter Stream
var Twit = require('twit'),
	_ = require('lodash');

module.exports = function(flagsMap, callback) {
	var T = new Twit({
		consumer_key: 'VfE0QYaKm2OcxXC1hXI7hg',
		consumer_secret: 'DsJfG1339jeiFCR5fKHvdezRlWYiWl7JaqJKaZGqe8',
		access_token: '452969037-X9vRwAUIH90Olpc4KzxXkWKtGiqbYaqC3P5TfT7Q',
		access_token_secret: 'ORZEC52kJ1z90MaOIK7dIIfAAyZ3Cd1bzD4XIArIcPA'
	});

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
		callback(hashtag);
	});

	return T;
}