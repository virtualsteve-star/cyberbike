# Cyberbike Duel - Game Specification

## Overview
**Cyberbikebike Duel** is a web-based arcade game inspired by the classic *Tron: Light Cycles* gameplay. Players control a lightbike that moves automatically in a cyberpunk grid-based arena, attempting to trap an AI opponent. The AI utilizes basic heuristics for evasion and strategic trapping. The game dynamically scales the arena based on browser dimensions.

## 1. Technology Stack
- **Language**: JavaScript
- **Rendering**: HTML5 Canvas API (or WebGL for enhanced effects)
- **Audio**: Web Audio API (oscillator nodes for retro arcade-style sound effects)
- **Game Loop**: `requestAnimationFrame` for smooth rendering
- **Input Handling**:
  - **Desktop**: Keyboard event listeners
    - Arrow Keys (⬆️⬇️⬅️➡️) or WASD for movement (90-degree turns only)
    - Spacebar for boost (2× speed increase while held)
  - **Mobile**: Thumb pad control surface for movement and boost activation
- **State Management**: JavaScript objects managing game logic (player, AI, trails, collisions, score, etc.)

## 2. Core Game Mechanics

### 2.1 Player Controls
- **Keyboard (Desktop)**:
  - Arrow Keys (⬆️⬇️⬅️➡️) or WASD for directional movement
  - Spacebar for speed boost
- **Mobile Controls**:
  - On-screen thumb pad for directional movement and boost activation
- **Continuous Motion**: Lightbikes move at a fixed base speed; stopping is not allowed.

### 2.2 AI Opponent Behavior
- **Initial Setup**: One AI opponent (extendable to multiple AIs in future updates)
- **Movement**:
  - Matches the player’s speed
- **Evasion & Trapping**:
  - Uses heuristics for random evasive maneuvers
  - Attempts to trap the player by narrowing escape routes

### 2.3 Movement & Trail Mechanics
- **Grid-Based Movement**: Lightbikes move in straight lines, turning only at 90-degree angles
- **Trail Mechanism**:
  - Each lightbike leaves a solid trail behind it
  - Colliding with any trail (player’s, AI’s, or own) or the arena boundary results in a crash
- **Grid Aesthetics**:
  - Experimental grid cell sizes ensure a visually appealing retro look

## 3. Game Flow

### 3.1 Start Screen
- Displays:
  - “Press Space to Start”
  - “Press I for Instructions”
- Pressing Space transitions to the **Ready Screen**

### 3.2 Instructions Screen
- Activated by pressing **I**
- Displays:
  - Movement controls
  - Boost mechanics
  - Objective: Trap the opponent and avoid crashes
  - Win condition: Best of 5 rounds
- Exits on any key press or tap (mobile)

### 3.3 Ready Screen (Pre-Round)
- Displays “READY PLAYER ONE” with intense background music
- Followed by a prominent “GO!” before starting the round

### 3.4 Rounds & Win Conditions
- **Match Format**: Best of 5 rounds (first to 3 wins)
- **Round Reset**:
  - After a crash, the winner is displayed
  - Brief pause before resetting lightbikes
- **Simultaneous Crashes**: Either a draw is declared or the round is replayed

### 3.5 Game Over Screen
- Displays the final winner
- Option to restart by pressing **Space**

## 4. UI & Visuals

### 4.1 Arena
- **Dynamic Sizing**: Adjusts based on browser window size
- **Grid Design**:
  - Dark background with neon grid lines
  - Grid cell size optimized for aesthetics
- **Trails & Lightbikes**:
  - **Player Trail**: Bright electric blue (RGB: 0, 150, 255)
  - **AI Trail**: Neon yellow (RGB: 255, 215, 0)
- **Borders**:
  - Solid gray walls (collidable)

### 4.2 Score & UI Placement
- **UI Positioning**: Bottom of the screen
- **Scoreboard**:
  - Displays current round (e.g., “Round 1 of 5”)
  - Shows Player vs. AI score
- **Boost Indicator**:
  - Visual bar or glow effect when active
- **Keypress Display**:
  - Virtual keypad-style display indicating movement and boost
- **Aesthetic**:
  - Neon style, glowing outlines, and retro fonts

## 5. Collision & Crash Effects

### 5.1 Crash Animations
- **Effect**:
  - On collision, an explosion effect triggers at the crash location
  - Brief bright flash matching the lightbike’s color
  - Short buzzing crash sound
  - Screen freezes momentarily (~0.5 sec)

### 5.2 Round Transition
- **Effect**:
  - Screen fades to black (~1 sec)
  - Displays round winner message (e.g., "PLAYER WINS ROUND 3")
  - Brief pause before next round

## 6. Sound Design

### 6.1 Background Music
- Continuous looping electronic synth track
- Increased intensity during “Ready Player One” screen

### 6.2 Sound Effects
- **Engine Hum**: Constant soft hum while moving
- **Boost Activation**: “Whoosh” effect
- **Crash Sound**: Loud arcade-style zap/explosion
- **Round Win Sound**: Short victory chime
- **Implementation**: Web Audio API oscillator nodes for retro sound effects

## 7. Additional Features (Future Considerations)
- **Gamepad Support**: Map controls to a joystick
- **Online Multiplayer**: Enable networked play
- **Power-ups**: Shields, extra boosts, etc.
- **Increased AI Count**: Support multiple AI lightbikes
- **Mobile Optimization**: Improve thumb pad controls

## 8. Development Priorities

### 8.1 Canvas Rendering & Movement Logic
- Implement continuous movement with 90-degree turns
- Develop collision detection for walls and trails

### 8.2 AI Opponent Logic
- Use basic heuristics for evasion and trapping
- Design an extendable AI module for additional opponents

### 8.3 UI & State Management
- Implement Best of 5 scoring system
- Manage game state transitions (Start, Instructions, Ready, Gameplay, Round Win, Game Over)
- Design bottom-screen UI elements

### 8.4 Sound & FX Handling
- Integrate arcade-style sound effects using the Web Audio API
- Implement animated crash and explosion effects

---

This structured specification provides a clear, organized reference for the development team, ensuring smooth implementation and future scalability.

