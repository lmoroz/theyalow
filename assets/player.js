const player           = document.querySelector('#player');
const controls_overlay = document.querySelector('.controls-overlay');
const progress_handler = controls_overlay.querySelector('.progress');
const sound_toggle     = controls_overlay.querySelector('.soundonof-button');

const player_toggle = function(event) {
  event.stopImmediatePropagation();
  const playState = player.paused ? 'play' : 'pause';
  player[playState]();
};

const playstate_update = function(event) {
  controls_overlay.classList.toggle('play', !player.paused);
};

const progress_update = function(event) {
  const percent                = (player.currentTime / player.duration) * 100;
  progress_handler.style.width = `${ percent }%`;
};

const sound_onof = function(event) {
  event.stopImmediatePropagation();
  player.volume = (controls_overlay.classList.contains('soundof')) ? 1 : 0;
  controls_overlay.classList.toggle('soundof', player.volume === 0);
  localStorage.setItem('theyalow-volume', player.volume);
};
const sound_init = function() {
  player.volume = localStorage.getItem('theyalow-volume') || 1;
  controls_overlay.classList.toggle('soundof', player.volume === 0);
};

controls_overlay.addEventListener('click', player_toggle);
player.addEventListener('play', playstate_update);
player.addEventListener('pause', playstate_update);
player.addEventListener('timeupdate', progress_update);
sound_toggle.addEventListener('click', sound_onof);
document.addEventListener('DOMContentLoaded', sound_init);
