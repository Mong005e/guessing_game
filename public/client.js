// console.log('javascript');
$(document).ready(onReady);

function onReady () {
loadGame();
// event listeners
  $('#start').on('click', startButton);
  $('#abandon-button').on('click', abandonGame);
  $('#restart-button').on('click', loadGame);
  // $('#check-guesses').on('click', checkGuesses);

}

function startButton () {
  var highRange = {
    max: $('#drop-down').val()
  };
  console.log('selected high range:', highRange);

  $.ajax({
    url: '/startGame',
    type: 'POST',
    data: highRange,
    success: function ( response ) {
      console.log('back from sever with:', response);
    } //  end success
  }); // end ajax
} // end startButton

function abandonGame () {
  var confirmAnswer = confirm("Do you really want to quit?");
  if (confirmAnswer) {
    console.log('quitter!!!');
    $('.game-div').empty();
    $('.game-div').append('<h1 id="quitter" >QUITTER!!!</h1>');
    setTimeout (function () {loadGame() ;},5000);

  }
}

function loadGame (){
  console.log('restarted');
  $('.game-div').empty();
  $('.game-div').append('<p>Player 1 </p><input type="text" id="user-guess-1" placeholder="enter your guess"><p>Player 2 </p><input type="text" id="user-guess-2" placeholder="enter your guess"><p>Player 3 </p><input type="text" id="user-guess-3" placeholder="enter your guess"><p>Player 4 </p><input type="text" id="user-guess-4" placeholder="enter your guess">');
}
