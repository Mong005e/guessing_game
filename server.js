//requires
var express = require ('express');
var app = express();
var path = require ('path');
var bodyParser = require ('body-parser');
var numberGen = require ('./number-module');

//globals
var maxValue;

//uses
app.use ( express.static ( 'public' ) ); // if index.html is not in a sub folder, you do not need the app.get('/')
app.use ( bodyParser.urlencoded( { extended: true } ) );

//spin up server
app.listen( 3004, function(){
  console.log( 'server up on port 3004');
});


//base url, needed only if your base url is not named index.html in the public folder, or index.html is in a sub folder within the public folder
app.get ('/', function (req, res){
  console.log( 'base url hit');
  //send back index.html as response


  res.sendFile (path.resolve ('public/public-index.html'));
});  //end base url

app.post('/startGame', function ( req, res ){
  maxValue = parseInt(req.body.max);
  console.log('received from client:', maxValue);
  console.log('random number generated: ' + numberGen(1, maxValue));
});

app.post('/checkGuesses', function ( req, res ){
  var guessesObj = req.body; // req.body = objectToSend
  console.log('received from client:', guessesObj );
  //logic


  res.send('meow');
});
