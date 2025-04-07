// ai.js

function aiBehavior(ai, player, LOOKAHEAD_STEPS) {
    let straightSafe = evaluateDirection(ai, ai.dir, LOOKAHEAD_STEPS, player);
    let leftDir = { x: -ai.dir.y, y: ai.dir.x };
    let leftSafe = (ai.dir.x === -leftDir.x && ai.dir.y === -leftDir.y)
                   ? -1 : evaluateDirection(ai, leftDir, LOOKAHEAD_STEPS, player);
    let rightDir = { x: ai.dir.y, y: -ai.dir.x };
    let rightSafe = (ai.dir.x === -rightDir.x && ai.dir.y === -rightDir.y)
                    ? -1 : evaluateDirection(ai, rightDir, LOOKAHEAD_STEPS, player);
    let bestSafe = straightSafe;
    let bestDir = ai.dir;
    if (leftSafe > bestSafe) { bestSafe = leftSafe; bestDir = leftDir; }
    if (rightSafe > bestSafe) { bestSafe = rightSafe; bestDir = rightDir; }
    if (bestDir.x !== ai.dir.x || bestDir.y !== ai.dir.y) {
      ai.pendingTurn = bestDir;
    }
  }
  
  function evaluateDirection(bike, dir, steps, opponent) {
    let bx = bike.backX, by = bike.backY;
    // Use the global bike length.
    const bikeLength = window.BIKE_LENGTH || 1.5;
    for (let i = 1; i <= steps; i++) {
      bx += dir.x;
      by += dir.y;
      let fx = bx + dir.x * bikeLength;
      let fy = by + dir.y * bikeLength;
      let fCell = { x: Math.floor(fx), y: Math.floor(fy) };
      // Check boundaries using global values.
      if (fCell.x < 0 || fCell.x >= window.COLS || fCell.y < 0 || fCell.y >= window.ROWS) return i - 1;
      // Check own trail.
      if (bike.trail.some(c => c.x === fCell.x && c.y === fCell.y)) return i - 1;
      // Check opponent trail.
      if (opponent.trail.some(c => c.x === fCell.x && c.y === fCell.y)) return i - 1;
    }
    return steps;
  }
  
  function checkCollision(bike, opponent) {
    let fCell = bike.getFrontCell();
    if (fCell.x < 0 || fCell.x >= window.COLS || fCell.y < 0 || fCell.y >= window.ROWS) {
      return true;
    }
    let selfCount = bike.trail.filter(c => c.x === fCell.x && c.y === fCell.y).length;
    if (selfCount > 0) return true;
    if (opponent.trail.some(c => c.x === fCell.x && c.y === fCell.y)) return true;
    return false;
  }
  
  window.AILogic = {
    aiBehavior,
    evaluateDirection,
    checkCollision
  };
  