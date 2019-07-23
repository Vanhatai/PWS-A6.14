const numDivs = 36;
const maxHits = 10;
const click = new Audio('./snd/click.wav');
const fail = new Audio('./snd/zap.wav');
const end = new Audio('./snd/close.wav');

let hits = 0;
let fails = 0;
let firstHitTime = 0;

function round() {
  // убрать "target" прежде чем искать новый
  // а также убрать текст со старых таргетов
  if ($('.grid-item').hasClass('target')) {
    $('.grid-item')
      .removeClass('target miss')
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
  let totalCount = Math.round(1000 * (100 - (fails * 5))/totalPlayedSeconds);
  end.play();
  $('#total-time-played').text(totalPlayedSeconds);
  $('#total-count').text(totalCount);
  $('#total-fails').text(fails);
  
  $('#win-message').removeClass("d-none");

  $('#button-reload').click(function() {
    location.reload();
  });
};

function handleClick(event) {
  let slot = $(event.target);
  if (slot.hasClass('target'))
   {
    hits ++;
    click.play();
    round();
  // промах, исключая щелчок на самой сетке
  } else {
      if (slot.hasClass('grid-item')) {
        slot.addClass('miss');
        fails ++;
        fail.play()
    }
  }
}

function init() {
  $('#button-reload').click(function() {
    hits = 0;
    fails = 0;
    round();
    $('.game-field').click(handleClick);
  });
}

$(document).ready(init);
