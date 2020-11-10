function areaOfACircle() {
  console.log("Area of a circle");

  var pi = 3.14;
  console.log(typeof pi);

  var radius = 5;
  console.log(typeof radius);

  var area = pi * radius ** 2;
  console.log(
    "The area of a circle given the radius " +
      radius +
      " (m) is " +
      area +
      " (m2)"
  );

  radius = 7;
  area = pi * radius ** 2;
  console.log(
    `The area of a circle given the radius ${radius} (m) is ${area} (m2)`
  );
}

areaOfACircle();
