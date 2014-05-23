var Twit = require('twit')

var T = new Twit({
	consumer_key: 'VfE0QYaKm2OcxXC1hXI7hg',
	consumer_secret: 'DsJfG1339jeiFCR5fKHvdezRlWYiWl7JaqJKaZGqe8',
	access_token: '452969037-X9vRwAUIH90Olpc4KzxXkWKtGiqbYaqC3P5TfT7Q',
	access_token_secret: 'ORZEC52kJ1z90MaOIK7dIIfAAyZ3Cd1bzD4XIArIcPA'
});

var stream = T.stream('statuses/filter', {
	track: ['#brazil', '#usa', '#japan', '#australia']
})

stream.on('tweet', function(tweet) {
	console.log(tweet.text);
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