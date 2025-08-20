'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

// Write your code here
import Game from '../modules/Game.class.js';

const game = new Game();
const startBtn = document.querySelector('.button');
const scoreEl = document.querySelector('.game-score');
const cells = document.querySelectorAll('.field-cell');

const msgStart = document.querySelector('.message-start');
const msgWin = document.querySelector('.message-win');
const msgLose = document.querySelector('.message-lose');

function render() {
  const state = game.getState();

  scoreEl.textContent = game.getScore();

  cells.forEach((cell, idx) => {
    const r = Math.floor(idx / 4);
    const c = idx % 4;
    const value = state[r][c];

    cell.textContent = value === 0 ? '' : value;
    cell.classList.remove(...cell.classList);
    cell.classList.add('field-cell');

    if (value > 0) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  msgStart.classList.add('hidden');
  msgWin.classList.add('hidden');
  msgLose.classList.add('hidden');

  if (game.getStatus() === 'win') {
    msgWin.classList.remove('hidden');
  }

  if (game.getStatus() === 'lose') {
    msgLose.classList.remove('hidden');
  }
}

startBtn.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    startBtn.textContent = 'Restart';
    startBtn.classList.remove('start');
    startBtn.classList.add('restart');
  } else {
    game.restart();
  }

  render();
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
  }

  render();
});

render();
