// Question 1
function positiveNumber(x) {
  if (x > 0) {
    console.log(`${x} is a positive number.`);
  } else if (x == 0) {
    console.log(`0 is zero`);
  } else {
    console.log(`${x} is a negative number.`);
  }
}

positiveNumber(3101);

// Question 2
function smallestBiggest(a, b, c) {
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
}

smallestBiggest(7, 4, 96);
