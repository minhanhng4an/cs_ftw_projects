// Question 1
function getLeapYears(start, end) {
  var leapYears = [];
  for (var i = start; i <= end; i++) {
    if (i % 400 === 0 || (i % 4 === 0 && i % 100 !== 0)) {
      leapYears.push(i);
    }
  }

  return leapYears;
}

console.log(getLeapYears(2000, 2020));

// Question 2
function reverseArray(arr) {
  return arr.reverse();
}

console.log(reverseArray([1, 2, 3, 4, 5]));

// Question 3
function getRandomInt(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

function getEvenNumbers() {
  var evenNumbers = [];
  var oddNumbers = [];

  for (var i = 1; i <= 100; i++) {
    var number = getRandomInt(0, 100);

    if (number % 2 === 0) {
      evenNumbers.push(number);
    } else {
      oddNumbers.push(number);
    }
  }

  console.log(evenNumbers);
  console.log(oddNumbers);
}

getEvenNumbers();
