'use strict';
///////////////////// Challenge #1 ///////////////////////
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  //String : "Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")

  dogs.forEach(function (dog, i) {
    if (dog > 3)
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    else console.log(`Dog number ${i + 1} is still puppy🐶`);
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//////////////////// Challenge #2 ///////////////////////
//1. Calculate human age with help of formula given and Map method
//2. make new array of those dogs whose age is > 18 with the help of filter method
//3. now average the age present in the array with th help of reduce

/*
const calcAverageHumanAge = function (dogAges) {
  const humanAges = dogAges.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // console.log(humanAges);

  const adults = humanAges.filter(age => age >= 18);
  // console.log(humanAges);
  // console.log(adults);

  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(avg1);

const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg2);
*/
/*
///////////// Challenge #3////////////////////////
// Write the above 'calcAverageHumanAge' with the help of Arrow function and Chaining the method
const calcAverageHumanAge = function (dogAges) {
  const humanAges = dogAges
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return humanAges;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/////////////// Challenge #4 //////////////////////
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's Dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  } `
);

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4. Create such String : "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(
  `${ownersEatTooMuch.join(
    ' and '
  )}'s dogs eat too much! and ${ownersEatTooLittle.join(
    ' and '
  )}'s dogs eat too little!`
);

//5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6. current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//7.
console.log(dogs.filter(checkEatingOkay));

//8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
