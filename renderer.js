// renderer.js

function drawCosmeticGrid(canvasWidth, GAME_HEIGHT, CELL_SIZE) {
  let s = (Math.sin(Date.now() / 500) + 1) / 2;
  let alpha = 0.4 + 0.6 * s;
  ctx.strokeStyle = `rgba(255,0,0,${alpha.toFixed(2)})`;
  ctx.lineWidth = 1;
  let cCols = 10;
  let cCellW = canvasWidth / cCols;
  let cRows = Math.floor(GAME_HEIGHT / cCellW);
  for (let i = 0; i <= cCols; i++) {
    let x = i * cCellW;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GAME_HEIGHT);
    ctx.stroke();
  }
  for (let j = 0; j <= cRows; j++) {
    let y = j * cCellW;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }
}

function drawPlayfieldBorder(COLS, CELL_SIZE, GAME_HEIGHT) {
  ctx.strokeStyle = "#700";
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, COLS * CELL_SIZE, GAME_HEIGHT);
}

function drawStateOverlays(gameState, canvasWidth, GAME_HEIGHT, roundResult, playerScore, aiScore) {
  ctx.textAlign = "center";
  if (gameState === "start") {
    ctx.font = "48px 'Orbitron', sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Cyberbike", canvasWidth / 2, GAME_HEIGHT / 2 - 60);
    ctx.fillText("Duel", canvasWidth / 2, GAME_HEIGHT / 2 - 10);
    ctx.font = "24px 'Orbitron', sans-serif";
    let alpha = 0.5 + 0.5 * Math.sin(Date.now() / 500);
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
    ctx.fillText("Press Space to Start, I for Instructions", canvasWidth / 2, GAME_HEIGHT / 2 + 30);
  } else if (gameState === "instructions") {
    ctx.font = "24px 'Orbitron', sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Arrow keys steer. Space boosts.", canvasWidth / 2, GAME_HEIGHT / 2 - 10);
    ctx.fillText("Best of 3 wins!", canvasWidth / 2, GAME_HEIGHT / 2 + 20);
  } else if (gameState === "ready") {
    if (Date.now() % 1000 < 1500) {
      ctx.font = "36px 'Orbitron', sans-serif";
      ctx.fillStyle = "#fff";
      ctx.fillText("READY PLAYER ONE", canvasWidth / 2, GAME_HEIGHT / 2);
    } else {
      ctx.font = "48px 'Orbitron', sans-serif";
      ctx.fillStyle = "red";
      ctx.fillText("FIGHT!", canvasWidth / 2, GAME_HEIGHT / 2);
    }
  } else if (gameState === "round_win") {
    ctx.font = "36px 'Orbitron', sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(roundResult, canvasWidth / 2, GAME_HEIGHT / 2);
  } else if (gameState === "game_over") {
    ctx.font = "48px 'Orbitron', sans-serif";
    ctx.fillStyle = playerScore > aiScore ? "lime" : "red";
    let msg = playerScore > aiScore ? "You Win!" : "You Lose!";
    ctx.fillText(msg, canvasWidth / 2, GAME_HEIGHT / 2 - 20);
    ctx.font = "24px 'Orbitron', sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Press R to Restart", canvasWidth / 2, GAME_HEIGHT / 2 + 20);
  }
  ctx.textAlign = "start";
}

function drawExplosions(dt, explosions) {
  for (let exp of explosions) {
    exp.update(dt);
    exp.draw();
  }
  for (let i = explosions.length - 1; i >= 0; i--) {
    if (explosions[i].done) {
      explosions.splice(i, 1);
    }
  }
}

function drawScene(dt, canvasWidth, canvasHeight, GAME_HEIGHT, COLS, CELL_SIZE, gameState, player, ai, explosions, roundResult, playerScore, aiScore) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  drawCosmeticGrid(canvasWidth, GAME_HEIGHT, CELL_SIZE);
  drawPlayfieldBorder(COLS, CELL_SIZE, GAME_HEIGHT);
  if (["game", "round_win", "ready"].includes(gameState)) {
    player.draw();
    ai.draw();
  }
  drawExplosions(dt, explosions);
  drawStateOverlays(gameState, canvasWidth, GAME_HEIGHT, roundResult, playerScore, aiScore);
}

function updateBoostIndicator(BOOST_MAX) {
  if (!window.player) return;
  const boostFuelBar = document.getElementById("boostFuelBar");
  let percentage = window.player.boostFuel / BOOST_MAX;
  boostFuelBar.style.width = (percentage * 100) + "%";
}

window.Renderer = {
  drawScene,
  updateBoostIndicator
};
