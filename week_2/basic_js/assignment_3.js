var x = 3101;

if (x > 0) {
  console.log(`${x} is a positive number.`);
} else if (x == 0) {
  console.log(`0 is zero`);
} else {
  console.log(`${x} is a negative number.`);
}

var a = 7;
var b = 4;
var c = 96;

var smallest = a;
var biggest = b;

if (a > b) {
  smallest = b;
  biggest = a;
  if (c > a) {
    biggest = c;
  } else if (c < b) {
    smallest = c;
  }
} else {
  if (c > b) {
    biggest = c;
  } else if (c < a) {
    smallest = c;
  }
}

console.log(`${smallest} is the smallest number, and ${biggest} is the biggest number between ${a}, ${b}, ${c}
`);
