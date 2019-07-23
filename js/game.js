const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  // убрать "target" прежде чем искать новый
  // а также убрать текст со старых таргетов
  if ($('.grid-item').hasClass('target')) {
    $('.grid-item')
      .removeClass('target')
      .removeClass('miss')
      .text('');
  }
  
  //создать новый таргет с текстом
  let divSelector = randomDivId();
  $(divSelector)
    .addClass('target')
    .text(hits+1)
  
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('.game-field').hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $('#total-time-played').text(totalPlayedSeconds);
  $('#win-message').removeClass("d-none");
  $('#button-reload').click(function() {
    // game-field reload
    $('.game-field').show();
    $('#win-message').addClass("d-none");
    hits = 0;
    round();
  });
};

function handleClick(event) {
  if ($(event.target).hasClass('target'))
   {
    hits = hits + 1;
    round();
  // промах, исключая щелчок на самой сетке
  } else if ($(event.target).attr('class') === "grid-item") {
      $(event.target).addClass('miss');
    }
  }

function init() {
  $('#button-reload').click(function() {
    hits = 0;
    round();
    $('.game-field').click(handleClick);
  });
}

$(document).ready(init);
