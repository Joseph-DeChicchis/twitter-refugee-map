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

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("key/twitter-refugee--1481491799644-firebase-adminsdk-q1oe7-4ab9574ffd.json"),
  databaseURL: "https://twitter-refugee-1481491799644.firebaseio.com"
});

var db = admin.database();

t.on('tweet', function (tweet) {
  console.log('tweet received', tweet['lang']);

  if (tweet['coordinates'] != null) {
    console.log('tweet received', tweet['coordinates']);

    var ref = db.ref("tweets/" + tweet['id']);

    ref.set(
      {
        id: ""+tweet['id'],
        circleValue: 1000000,
        lat: tweet['coordinates']['coordinates'][1],
        long: tweet['coordinates']['coordinates'][0]
      }
    );
  }
  else {
    /*
    if (tweet['lang'] == 'en') {
      var ref = db.ref("tweets/" + tweet['id']);
      ref.set(
        {
          id: ""+tweet['id'],
          circleValue: 1000000,
          lat: 49.25,
          long: -123.1
        }
      );
    }*/
  }
  /*
  if (tweet['place'] != null) {
    console.log('tweet received', JSON.stringify(tweet['place']['bounding_box']['coordinates']), tweet['place']['full_name']);
  }*/
})

t.on('error', function (err) {
  console.log('Oh no')
})

t.track('refugee');       //English
t.track('flüchtling');    //German
t.track('réfugié');       //French
t.track('vluchteling');   //Dutch

app.get("/", function(request, response, next) {

    response.sendFile(__dirname + '/public/index.html')
});

app.get("/*", function(request, response, next) {
    console.log("404 not found")
    response.sendFile(__dirname + '/public/404.html')
});
