'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; // declaring them outside the function
// Starting Conditions
const init = function () {
  // assign then in function
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  // FIRST CHANGE ALL VISIBLE CLASS CONTENT
  // all element score to ZERO
  score1El.textContent = 0;
  score2El.textContent = 0;

  // all current score back to zero
  current0El.textContent = 0;
  current1El.textContent = 0;

  // remove the winner class background color
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // remove the active class of player-2 player and set active class as player-1
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling DIce Functionality button
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random Dice roll value
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display the Dice (first remove the hidden class of dice and then display the dice image according to random value generated )
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add a dice value to the current score
      currentScore += dice;

      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore; // Change later
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold button code
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // if scores[1] then = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game, Player WIN
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if not then switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
