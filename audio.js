// audio.js

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const playerEngineAudio = new Audio("assets/bike_sound.mp3");
playerEngineAudio.loop = true;
const aiEngineAudio = new Audio("assets/bike_sound.mp3");
aiEngineAudio.loop = true;
const bgMusicAudio = new Audio("assets/attract_music1.mp3");
bgMusicAudio.loop = true;

const explosionAudio = new Audio("assets/explosion.mp3");
const playerWinAudio = new Audio("assets/player_win.mp3");
const aiWinAudio = new Audio("assets/ai_win.mp3");
const getReadyAudio = new Audio("assets/get_ready.mp3");
const fightMusicAudio = new Audio("assets/fight_music.mp3");

let currentMusic = null;

function updateEngineSounds() {
  // Note: Assumes that 'player' and 'ai' are available on window
  playerEngineAudio.playbackRate = (window.player && window.player.boostActive ? 1.5 : 1.0);
  aiEngineAudio.playbackRate = 1.2;
  console.log("Engine sounds updated. Player boost:", window.player ? window.player.boostActive : "N/A");
}

function startEngineSounds() {
  console.log("Starting engine sounds");
  playerEngineAudio.currentTime = 0;
  aiEngineAudio.currentTime = 0;
  playerEngineAudio.play();
  aiEngineAudio.play();
}

function stopEngineSounds() {
  console.log("Stopping engine sounds");
  playerEngineAudio.pause();
  aiEngineAudio.pause();
}

function startBackgroundMusicAudio() {
  console.log("Starting background music");
  bgMusicAudio.currentTime = 0;
  bgMusicAudio.play();
  currentMusic = bgMusicAudio;
}

function stopBackgroundMusicAudio() {
  console.log("Stopping background music");
  bgMusicAudio.pause();
  if (currentMusic === bgMusicAudio) {
    currentMusic = null;
  }
}

function fadeOutAndPlayAttract2() {
  console.log("Fading out fight music and playing attract_music2.mp3");
  let fadeDuration = 2.0; // seconds
  let fadeSteps = 20;
  let fadeInterval = fadeDuration / fadeSteps;
  let initialVolume = fightMusicAudio.volume || 1.0;
  let step = initialVolume / fadeSteps;
  let fadeOutTimer = setInterval(() => {
    fightMusicAudio.volume = Math.max(0, fightMusicAudio.volume - step);
    if (fightMusicAudio.volume <= 0) {
      clearInterval(fadeOutTimer);
      fightMusicAudio.pause();
      fightMusicAudio.volume = initialVolume;
      // Ensure any currently playing music is stopped
      if (currentMusic && currentMusic !== fightMusicAudio) {
        currentMusic.pause();
      }
      let attract2 = new Audio("assets/attract_music2.mp3");
      attract2.loop = true;
      attract2.currentTime = 0;
      attract2.play();
      currentMusic = attract2;
      console.log("attract_music2.mp3 started");
    }
  }, fadeInterval * 1000);
}

// Expose these functions and variables as a global AudioManager object.
window.AudioManager = {
  audioCtx,
  playerEngineAudio,
  aiEngineAudio,
  bgMusicAudio,
  explosionAudio,
  playerWinAudio,
  aiWinAudio,
  getReadyAudio,
  fightMusicAudio,
  get currentMusic() { return currentMusic; },
  updateEngineSounds,
  startEngineSounds,
  stopEngineSounds,
  startBackgroundMusicAudio,
  stopBackgroundMusicAudio,
  fadeOutAndPlayAttract2
};
