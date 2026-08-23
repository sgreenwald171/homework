'use strict';

function multiply(a, b) {
  return a * b;
}

const result = multiply(2, 3);
console.log(result); 

const result2 = multiply(4, 5);
console.log(result2);

const result3 = multiply(6, 7);
console.log(result3);

function getMultiplier() {
  return function (a, b) {
    return a * b;
  };
}

const multiplier = getMultiplier();
const result4 = multiplier(2, 3);
console.log(result4);

const result5 = multiplier(4, 5);
console.log(result5);

function mixedMultiplier(a) {
  return function (b) {
    return a * b;
  };
}

const multiplyBy2 = mixedMultiplier(2);
console.log(multiplyBy2(3));

const multiplyBy4 = mixedMultiplier(4);
console.log(multiplyBy4(5));

function ourEvery(array, tester) {
  for (let i = 0; i < array.length; i++) {
    if (!tester(array[i])) {
      return false;
    }
  }
  return true;
}

const letters = ['a', 'b', 'c'];

console.log(ourEvery(letters, isUpperCase));

function isUpperCase(letter) {
  if (letter === letter.toUpperCase()) {
    return true;
  } else return false;
}

console.log(ourEvery(letters, isLowerCase));

function isLowerCase(letter) {
  if (letter !== letter.toUpperCase()) {
    return true;
  } else return false;
}

console.log(letters.every(isUpperCase));
console.log(letters.every(isLowerCase));

function ourSome(array, tester) {
  for (let i = 0; i < array.length; i++) {
    if (tester(array[i])) {
      return true;
    }
  }
  return false;
}

const letters2 = ['a', 'B', 'C'];

console.log(ourSome(letters2, isUpperCase));
console.log(ourSome(letters2, isLowerCase));
console.log(letters2.some(isUpperCase));
console.log(letters2.some(isLowerCase));