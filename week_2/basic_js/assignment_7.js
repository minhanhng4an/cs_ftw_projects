function convertNumber(number) {
  var result = "";
  if (number % 7 === 0) {
    result = result + "Super";
  }

  if (number % 3 === 0) {
    result = result + "Fizz";
  }

  if (number % 5 === 0) {
    result = result + "Buzz";
  }

  if (result === "") {
    return number;
  } else {
    return result;
  }
}

function outputRange(start, end) {
  var result = "";

  for (var i = start; i < end - 1; i++) {
    result = result + convertNumber(i) + ", ";
  }

  result = result + convertNumber(i);

  return result;
}

console.log(outputRange(1, 20));
