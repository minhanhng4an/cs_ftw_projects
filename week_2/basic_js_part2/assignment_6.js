// Question 1

function findFirstString(arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    if (typeof arr[i] == "string") {
      return arr[i];
    }
  }
}

var variousThings = [
  true,
  true,
  true,
  false,
  true,
  true,
  1,
  true,
  true,
  false,
  true,
  false,
  true,
  "hello",
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  "world",
  true,
];

console.log(findFirstString(variousThings));

// Question 2
function normalizeEmails(arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    arr[i] = arr[i].trim().toLowerCase();
  }

  return arr;
}

var emails = ["  PETER@gmail.com", "Mia1024@gmail.COM  ", " Dorian@gmail.com "];

console.log(normalizeEmails(emails));

// Question 3
function splitNames(name) {
  return { firstName: name.split(" ")[0], lastName: name.split(" ")[1] };
}

console.log(splitNames("Peter Parker"));

// Question 4
var characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomInt(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

function getRandomString(length) {
  var password = "";

  for (var i = 1; i <= length; i++) {
    password = password + characters[getRandomInt(0, characters.length)];
  }

  return password;
}

console.log(getRandomString(5));
