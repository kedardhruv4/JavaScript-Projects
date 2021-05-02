'use strict';
/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number !';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);

/////////// Step wise explanation //////////
//-----------------lecture - 4-----------------------
line 2 - just selecting the element class from the html page (i.e. .message class)

//-----------------lecture - 5 ----------------------------
line 4 - DOM manipulation i.e we change the content of the element class .message from START GUESSING... to CORRECT NUMBER!

line 6,7 -change the content of .number and .score  class

line 9 - read the value from the input box which user will input there

line 10 - we can also manipulate it by setting the value manually 
*/
//---------------- lecture - 6 -------------------------------
//------------------ Lecture - 7 ------------------------------
// Handling click events
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'NO number';
    displayMessage('NO Number');

    // When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct Number !!!!';
    displayMessage('Correct Number !!!');

    document.querySelector('.number').textContent = secretNumber;

    // Background-color change
    document.querySelector('body').style.backgroundColor = '#adff2f';
    // Increase the width of secret number display box
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  // When guess is Wrong (Implemented Too high and Too low condition inside one block)
  else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? 'Too High!' : 'Too Low!';
      score--;
      displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low!');
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You Lost the Game!!!!';
      displayMessage('You Lost the Game!!!!');

      document.querySelector('.score').textContent = 0;
    }
  }
  // // When guess is too High
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too High!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You Lost the Game!!!!';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // When guess is too Low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You Lost the Game!!!!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.number').style.width = '15rem';
});

/*
////////// DOM manipulation //////////////
line 29 - whenever click event take place, also change the message class from start guessing to Correct number (Not necessary thats why commented)

line 33 - if the input box is empty, then change the .message content to NO NUMBER
*/

/*
//////////////////////// Coding Challenge #1   ////////////////
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and 'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input fields
4. Also restore the original background color (#222) and number width (15rem)
*/
