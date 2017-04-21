//requires
var express = require ('express');
var app = express();
var path = require ('path');
var bodyParser = require ('body-parser');
var numberGen = require ('./number-module');

//globals
var maxValue;
var randomNumber = 0;

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

  randomNumber = numberGen(1, maxValue);
  randomNumber = parseInt(randomNumber);
  console.log('random number generated: ' + randomNumber);
  res.sendStatus(201);
});

app.post('/checkGuesses', function ( req, res ){
  var guessesObj = req.body; // req.body = objectToSend
  console.log('received from client:', guessesObj );
  //logic
  checkGuesses(req.body.player1);
  checkGuesses(req.body.player2);
  checkGuesses(req.body.player3);
  checkGuesses(req.body.player4);

  var objectToSend = {
    player1: checkGuesses(req.body.player1),
    player2: checkGuesses(req.body.player2),
    player3: checkGuesses(req.body.player3),
    player4: checkGuesses(req.body.player4)
  };

  console.log(objectToSend);
  res.send(objectToSend);
});

function checkGuesses (playersGuess){

  playersGuess = parseInt(playersGuess);
  // randomNumber = parseInt(randomNumber);
  console.log('in checkGuesses player guess:', playersGuess);
  console.log('in checkGuesses check guess', randomNumber);
  if (randomNumber === playersGuess) {
    return 'correct' ;
    }
    else if (randomNumber > playersGuess) {
      return 'low' ;
    }
    else {
      return 'high' ;
    }

}
