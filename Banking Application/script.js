'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    // console.log(mov);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}
          </div>
          <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const updateUI = function (acc) {
  // Display movement
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
// Login Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update the UI
    updateUI(currentAccount);
  }
});

// Transfer Money event
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  // Check some conditions to transfer the money to another account
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log('Transfer Valid');
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
});

// Loan Feature (using some method)
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  // loan condition is amount should be greater then 10% of the any deposit of the requested amount
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // then Add that movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Close account using FindIndex Method event
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete Account
    accounts.splice(index, 1);

    // Log out and Side UI
    containerApp.style.opacity = 0;
  }

  // Clear text box
  inputCloseUsername.value = inputClosePin.value = '';
});

// Sorting Movement
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
//---------------------Lecture - 3---------------//
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE method
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE method
// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr.splice(1, 2));
console.log(arr);

// REVERSE method
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse(arr2));
console.log(arr2);

// CONCAT method
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN method
console.log(letters.join(' - '));
*/
/*
//-------------Lecture - 4----------------//
// Looping arrays foreach : will start using bank account data
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Simple for of loop
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} :You withdrew ${Math.abs(movement)}`);
  }
}

// forEach loop
console.log('--------FOREACH LOOP--------');
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1} : You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1} :You withdrew ${Math.abs(movement)}`);
  }
});
*/
/*
//-------------Lecture - 5-------------------//
// forEach with Maps and Sets

// forEach with MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

// forEach with Set
const currenciesUnique = new Set([
  'USD',
  'EUR',
  'USD',
  'USD',
  'GBP',
  'EUR',
  'GBP',
]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key} : ${value}`);
});
*/
/*
//----------------Lecture - 10------------------//
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eroToUsd = 1.1;

// Map method (using simple function and Arrow function )
// const movementsUSD = movements.map(function (mov, i) {
//   return mov * eroToUsd;
// });
const movementsUSD = movements.map(mov => mov * eroToUsd);
console.log(movements);
console.log(movementsUSD);

// Do the above with for of loop
let newMovements = [];
for (const mov of movements) {
  newMovements.push(mov * eroToUsd);
}
console.log(newMovements);

// Print that using map method
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1} :You withdrew ${Math.abs(movement)}`);
//   }
// });
const movementDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1} :You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementDescriptions);
// above we use Arrow function as well as ternary operation
*/
/*
///---------------Lecture - 12-----------------//
// Filter Method : get only int
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// using simple for loop
const depositArr = [];
for (const mov of movements) {
  if (mov > 0) depositArr.push(mov);
}
console.log(depositArr);

// Filter Method : get only withdrawal
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(movements);
console.log(withdrawals);
*/
/*
//------------------Lecture - 13----------------//
// Reduce Method : it uses accumulator which is like snowball h
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// const balance = movements.reduce(function (acc, mov, i, arr) {
//   console.log(`Iteration ${i} : ${acc}`);
//   return acc + mov;
// }, 0);
// console.log(balance);

// write above function using arrow function
const balance = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance);

// write above code manually with the help of for of loop
let temp = 0;
for (const [i, mov] of movements.entries()) {
  console.log(`Iteration ${i} : ${temp}`);
  temp += mov;
}
console.log(temp);

// Write function to calculate maximum number from movement using reduce
const maximum = movements.reduce(function (acc, mov, i) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(maximum);

// Write function to calculate minimum number from movement using reduce
const minimum = movements.reduce(function (acc, mov, i) {
  if (acc < mov) return acc;
  else return mov;
}, movements[0]);
console.log(minimum);
*/
/*
//--------------Lecture - 15-------------------//
// The magic of chaining methods
const eroToUSD = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eroToUSD)
  .reduce((acc, mov) => acc + mov);
console.log(totalDepositsUSD);
*/
/*
//--------------Lecture - 17-----------------//
// Find method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// for (const acc of accounts) {
//   const account = acc.find(acc => acc.owner === 'Jessica Davis');
//   console.log(account);
// }
*/
/*
//---------------Lecture - 21--------------------//
// Some and Every method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// includes method : Checks only Equality
console.log(movements.includes(-130));

// Some method : Checks on the basis of Condition
console.log('----- SOME -----');
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// Every method
// returns FALSE because all element in movements is not positive
console.log('---- EVERY -----');
console.log(movements.every(mov => mov > 0));

// returns TRUE because all element in account4.movements is positive
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
console.log('---- SEPARATE CALLBACK FUNCTION ----');
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/
/*
//-------------Lecture - 22---------------------//
// Flat and FlatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat(2));

// Exercise : calculate all account balance at onces
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// flat : using optional chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);
*/
/*
//-----------------Lecture - 23------------------//
// Sorting Arrays

//Strings
const owner = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owner.sort());
console.log(owner);

//Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// Ascending order
// if < 0 then return A,B (Keep order)
// If > 0 then return B,A (Switch order)
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b); //Simple version
console.log(movements);

// Descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a); //Simple version
console.log(movements);
*/

//----------------Lecture - 24--------------//
// More ways of creating and filling Array
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty Array + fill method
const x = new Array(7);
// console.log(x.map(() => 1)); // wont work
x.fill(1);
console.log(x);
arr.fill(23, 2, 6);
console.log(arr);

// Array.from
console.log('----Array.from----');
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

// Array.from on Application
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
  console.log(
    `Sum of Balance is ${movementsUI.reduce((acc, el, i) => acc + el, 0)}`
  );
});
