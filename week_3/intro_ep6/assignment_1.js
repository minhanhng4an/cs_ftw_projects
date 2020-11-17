function modifyLetVariable() {
  let releaseName = "ES6";
  {
    releaseName = "ES2015";
  }
  // Put your answer in to make it returns true
  return releaseName === "ES2015";
}

function trappedVariable() {
  // Create a variable x=3 somewhere so that it throws an
  // ReferenceError: x is not defined
  if (true) {
    let x = 3;
  }
  return x;
}

function blockLetAndConst() {
  let x = 111;
  {
    const x = 222;
  }
  // Put your answer in to make it returns true
  return x === 111;
}

function immutableReference() {
  const object = { a: "b" };
  object.a = "q";
  // Put your answer in to make it returns true
  return object.a === "q";
}

// 1.
function doLoop() {
  for (var i = 0; i < 10; i++) {}
  // 1. Put your answer in to make it returns true
  // 2. Then change the for loop so that i is trapped inside of the loop, and can't be returned.
  return i === 10;
}

// 2.
function doLoop() {
  for (let i = 0; i < 10; i++) {}
  // 1. Put your answer in to make it returns true
  // 2. Then change the for loop so that i is trapped inside of the loop, and can't be returned.
  return i === 10;
}
