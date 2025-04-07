// input.js
(function(){
  const keyToButton = {
    "ArrowUp": "up", "KeyW": "up",
    "ArrowDown": "down", "KeyS": "down",
    "ArrowLeft": "left", "KeyA": "left",
    "ArrowRight": "right", "KeyD": "right",
    "Space": "boost"
  };

  // Helper to set button active state on-screen
  function setButtonActive(keyCode, active) {
    const btnId = keyToButton[keyCode];
    if (btnId) {
      document.getElementById(btnId).classList.toggle("active", active);
    }
  }

  function init() {
    const boostBtn = document.getElementById("boost");

    // Keydown event
    window.addEventListener("keydown", (e) => {
      if (keyToButton[e.code]) setButtonActive(e.code, true);
      if (gameState === STATE.START) {
        if (e.code === "Space") {
          AudioManager.audioCtx.resume().then(() => {
            console.log("Space pressed: Starting game");
            startReadyScreen();
          });
        } else if (e.code === "KeyI") {
          gameState = STATE.INSTRUCTIONS;
        }
      } else if (gameState === STATE.INSTRUCTIONS) {
        startReadyScreen();
      } else if (gameState === STATE.GAME) {
        switch(e.code) {
          case "ArrowUp":
          case "KeyW":
            player.pendingTurn = { x: 0, y: -1 };
            break;
          case "ArrowDown":
          case "KeyS":
            player.pendingTurn = { x: 0, y: 1 };
            break;
          case "ArrowLeft":
          case "KeyA":
            player.pendingTurn = { x: -1, y: 0 };
            break;
          case "ArrowRight":
          case "KeyD":
            player.pendingTurn = { x: 1, y: 0 };
            break;
          case "Space":
            if (player.boostFuel > 0) {
              player.boostActive = true;
            }
            break;
        }
      } else if (gameState === STATE.GAME_OVER) {
        if (e.code === "KeyR") {
          if (currentMusic) {
            currentMusic.pause();
            currentMusic = null;
          }
          gameState = STATE.START;
          roundNumber = 1;
          playerScore = 0;
          aiScore = 0;
          initializeBikes();
          updateScoreboard();
          AudioManager.startBackgroundMusicAudio();
        }
      }
    });

    // Keyup event
    window.addEventListener("keyup", (e) => {
      if (keyToButton[e.code]) setButtonActive(e.code, false);
      if (gameState === STATE.GAME && e.code === "Space") {
        player.boostActive = false;
      }
    });

    // On-screen D-pad event listeners
    ["up", "down", "left", "right"].forEach(id => {
      const btn = document.getElementById(id);
      btn.addEventListener("mousedown", () => btn.classList.add("active"));
      btn.addEventListener("mouseup", () => btn.classList.remove("active"));
      btn.addEventListener("click", () => {
        if (gameState === STATE.GAME) {
          if (id === "up") player.pendingTurn = { x: 0, y: -1 };
          if (id === "down") player.pendingTurn = { x: 0, y: 1 };
          if (id === "left") player.pendingTurn = { x: -1, y: 0 };
          if (id === "right") player.pendingTurn = { x: 1, y: 0 };
        }
      });
    });

    // Boost button event listeners
    boostBtn.addEventListener("mousedown", () => {
      if (player.boostFuel > 0) {
        player.boostActive = true;
        boostBtn.classList.add("active");
      }
    });
    boostBtn.addEventListener("mouseup", () => {
      player.boostActive = false;
      boostBtn.classList.remove("active");
    });
  }

  // Expose our input handler globally.
  window.InputHandler = {
    init
  };
})();
