function getAverage() {
  const obj = { x: 3.6, y: 7.8, z: 4.3 };
  // refactor with object destructuring in one statement
  // const x = obj.x;
  // const y = obj.y;
  // const z = obj.z;
  // YOUR CODE STARTS HERE

  const { x, y, z } = obj;

  return Math.floor((x + y + z) / 3.0);
}

function getAddress() {
  let coderschool = {
    city: "HCMC",
    country: "Vietnam",
    address: {
      number: 12,
      street: "Ton Dan",
      district: "4",
    },
  };
  // Using destructuring to create a 'city', 'country' and 'street' variable,
  // so that the function returns true
  // YOUR CODE STARTS HERE

  let { city, country, address } = coderschool;
  street = address.street;

  return city === "HCMC" && country === "Vietnam" && street === "Ton Dan";
}

function getElements() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  // refactor with skipped destructuring for arrays in one statement
  // YOUR CODE STARTS HERE
  let [first, , third, fourth] = arr;

  return { first, third, fourth };
}

function getNestedElements() {
  const food = [
    ["carrots", "beans", "peas", "lettuce"],
    ["apples", "mangos", "oranges"],
    ["cookies", "cake", "pizza", "chocolate"],
  ];
  // refactor with nested destructuring of arrays
  const [[carrots], [, mangos], [cookies]] = food;
  // YOUR CODE STARTS HERE

  return { carrots, cookies, mangos };
}

function restParameters(first, ...rest) {
  return rest[0] === 1 && rest[1] === 2;
}
// Put the parameters in so that it prints out true
console.log(restParameters(1, 1, 2));

function ontoAnObject() {
  const array = [1, 2, 3, 4, 5, 6];
  const object = {};
  // refactor this with destructuring and rest in one statement
  object.one = array[0];
  object.two = array[1];
  object.three = array[2];
  object.rest = array.slice(3);
  // YOUR CODE STARTS HERE
  [object.one, object.two, object.three, ...object.rest] = array;

  return object;
}

function findTheMax() {
  const arr1 = [1, 7, 2, 4];
  const arr2 = [1, 9, 5, 8];
  // Using Math.max() and spread operator
  // to find the maximum number in both arrays
  return Math.max(...arr1, ...arr2);
}

function concatenateArrays() {
  const arr1 = [0, 1, 2, 3];
  const arr2 = [4, 5, 6];
  const arr3 = [7, 8, 9];
  // Merge those arrays into one using spread operator in one statement
  const result = [...arr1, ...arr2, ...arr3];
  return result;
}

function mergeObjects() {
  // what does this return?
  const obj1 = {
    a: "a from obj1",
    b: "b from obj1",
    c: "c from obj1",
    d: {
      e: "e from obj1",
      f: "f from obj1",
    },
  };
  const obj2 = {
    b: "b from obj2",
    c: "c from obj2",
    d: {
      g: "g from obj2",
      h: "g from obj2",
    },
  };
  const result = { ...obj1, ...obj2 };

  // Put your answer in to make it returns true
  return (
    result.a === "a from obj1" &&
    result.b === "b from obj2" &&
    result.c === "c from obj2" &&
    result.d === obj2.d &&
    result.e === undefined &&
    result.f === undefined &&
    result.g === undefined &&
    result.h === undefined
  );
}

console.log(mergeObjects());
