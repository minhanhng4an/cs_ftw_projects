// Question 1
for (var i = 1; i <= 5; i++) {
  console.log(Math.random());
}

// Question 2 + 3
function getRandomInt(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

for (var i = 1; i <= 100; i++) {
  console.log(getRandomInt(5, 8));
}

// Question 4
function getRandomItem(arr) {
  var index = getRandomInt(0, arr.length - 1);

  return arr[index];
}

var arr = ["apple", "orange", "kiwi"];

console.log(getRandomItem(arr));
