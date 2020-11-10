// Question 1
var n = 4;

for (var i = 1; i <= n; i++) {
  var row = "";
  for (var j = 1; j <= i; j++) {
    row = row + i + " ";
  }
  console.log(row);
}

// Question 2

for (var i = 1; i <= 8; i++) {
  var pattern = "# ";

  if (i % 2 === 0) {
    pattern = " #";
  }

  var row = "";
  for (var j = 1; j <= 4; j++) {
    row = row + pattern;
  }

  console.log(row);
}
