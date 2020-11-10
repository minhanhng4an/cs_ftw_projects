// Question 1
function numbersBetween(a, b) {
  if (a > b) {
    var c = a;
    a = b;
    b = c;
  }

  console.log(`Numbers between ${a} & ${b}, inclusively are:`);
  for (var i = a; i <= b; i++) {
    console.log(i);
  }
}

numbersBetween(2, 8);

// Question 2
function sumNumbers(x, y) {
  if (x > y) {
    var z = x;
    x = y;
    y = z;
  }

  var sum = 0;

  for (var i = x; i <= y; i++) {
    sum = sum + i;
  }

  console.log(`Sum of numbers from ${x} to ${y} is: ${sum}`);
}

sumNumbers(92, 11);

// Question 3

function sumDigits(number) {
  var sum = 0;
  var tem = number;

  for (var i = 1; i <= number.toString().length; i++) {
    sum = sum + (tem % 10);
    tem = (tem - (tem % 10)) / 10;
  }

  return `Sum of digits of ${number} is ${sum}`;
}

console.log(sumDigits(741996));
