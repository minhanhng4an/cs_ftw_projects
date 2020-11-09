var a = 2;
var b = 8;

var x = 11;
var y = 92;

var number = 7496;

// Question 1
if (a > b) {
  var c = a;
  a = b;
  b = c;
}

console.log(`Numbers between ${a} & ${b}, inclusively are:`);
for (var i = a; i <= b; i++) {
  console.log(i);
}

// Question 2

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

// Question 3
var first = (number - (number % 1000)) / 1000;
var tem = number % 1000;

var second = (tem - (tem % 100)) / 100;
tem = tem % 100;

var third = (tem - (tem % 10)) / 10;

tem = tem % 10;

console.log(`Sum of digits of ${number} is ${first + second + third + tem}`);
