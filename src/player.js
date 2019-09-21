const player           = document.querySelector('#player');
const controls_overlay = document.querySelector('.slider-item__video');
const progress_handler = controls_overlay.querySelector('.progress');
const sound_toggle     = controls_overlay.querySelector('.soundonoff-button');

const news_player           = document.querySelector('#news-item-video-player');
const news_controls_overlay = document.querySelector('.news-item-video');

const player_toggle = function(event) {
  event.stopImmediatePropagation();
  const playState = player.paused ? 'play' : 'pause';
  player[playState]();
  if (playState=='play') news_player.pause();
};

const playstate_update = function(event) {
  controls_overlay.classList.toggle('play', !player.paused);
};

const progress_update = function(event) {
  const percent                = (player.currentTime / player.duration) * 100;
  progress_handler.style.width = `${ percent }%`;
};

const sound_onoff = function(event) {
  event.stopImmediatePropagation();
  player.volume = (controls_overlay.classList.contains('soundoff')) ? 1 : 0;
  controls_overlay.classList.toggle('soundoff', player.volume === 0);
  localStorage.setItem('theyalow-volume', player.volume);
};
const sound_init = function() {
  player.volume = localStorage.getItem('theyalow-volume') || 1;
  controls_overlay.classList.toggle('soundoff', player.volume === 0);
};

const news_player_toggle = function(event) {
  event.stopImmediatePropagation();
  const playState = news_player.paused ? 'play' : 'pause';
  news_player[playState]();
  if (playState=='play') player.pause();
};

const news_player_playstate_update = function(event) {
  news_controls_overlay.classList.toggle('play', !news_player.paused);
};


controls_overlay.addEventListener('click', player_toggle);
player.addEventListener('play', playstate_update);
player.addEventListener('pause', playstate_update);
player.addEventListener('timeupdate', progress_update);
sound_toggle.addEventListener('click', sound_onoff);
document.addEventListener('DOMContentLoaded', sound_init);

news_controls_overlay.addEventListener('click', news_player_toggle);
news_player.addEventListener('play', news_player_playstate_update);
news_player.addEventListener('pause', news_player_playstate_update);
news_player.addEventListener('timeupdate', news_player_playstate_update);

