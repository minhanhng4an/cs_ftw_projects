const inventors = [
  "Albert Einstein",
  "Issac Newton",
  "Galileo Galilei",
  "Marie Curie",
  "Johannes Kepler",
  "Nicolaus Copernicus",
  "Max Planck",
  "Katherine Blodgett",
  "Ada Lovelace",
  "Sarah E. Goode",
  "Lise Meitner",
  "Hanna Hammarstrom",
];
// 1.
console.log(inventors.filter((x) => x[0] === "A"));

// 2.
console.log(
  inventors.filter(function (x) {
    x = x.split(" ");
    return x[0][0] == x[x.length - 1][0];
  })
);

// 3.
console.log(inventors.sort());

// 4.
console.log(
  inventors.sort(function (a, b) {
    return a.length - b.length;
  })
);

// 5.
console.log(inventors.map((x) => x.length));

// 6.
console.log(inventors.map((x) => x.toUpperCase()));

// 7.
console.log(inventors.sort().reduce((a, x) => a + x.split(" ")[0] + " ", ""));

// 8.
console.log(
  inventors.map((x) => x.length).reduce((a, x) => a + x),
  0
);
