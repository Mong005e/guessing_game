// console.log('javascript');
$(document).ready(onReady);

function onReady () {

  $('#start').on('click', startButton);
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
