// Question 1
function first() {
  console.log("Wow, it worked");
}

first();

// Question 2

function second() {
  return "Avengers";
}

console.log(second());

// Question 3

function third(name) {
  return "Hello " + name + "! How are you doing today?";
}

console.log(third("Minh Anh"));

// Question 4

function forth(a, b) {
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

forth(2, 8);
