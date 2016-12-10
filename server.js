// Require our dependencies
var express = require('express');

  var Twitter = require('node-tweet-stream')
    , t = new Twitter({
      consumer_key: '6kpisyD2fy1unFRWXmsvgkqjU',
      consumer_secret: 'qkXATKioAgkIPsXI8AnP84u7VrZDipDjCNkFk5oyWrL6Om7QSx',
      token: '1492647266-4MgvXfRNVzx6l8CHRCjNxkiKGR94XtgXI41rfa0',
      token_secret: 'MupsKT27Ga9zU0lRWKu1INHHpBCGbksCI6gFLR9gu7DKk'
    })

// Create an express instance and set a port variable
var app = express();
app.set('port', (process.env.PORT || 5000));

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});

t.on('tweet', function (tweet) {
  console.log('tweet received', tweet)
})

t.on('error', function (err) {
  console.log('Oh no')
})

t.track('refugee');
t.track('');


/*
// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords

console.log("BREAK 1");

twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
  console.log("BREAK 2");
  streamHandler(stream,io);
});

function streamHandler(stream,io) {

  console.log("ININ");

}*/
