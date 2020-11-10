var userA = {
  id: 123456,
  name: "Peter Parker",
  email: "peter.parker@gmail.com",
  role: "student",
  courseId: 112233,
  tasks: [
    { name: "Task 1", status: "Done" },
    { name: "Task 2", status: "Not Started" },
    { name: "Task 3", status: "In Progress" },
    { name: "Task 4", status: "Not Started" },
    { name: "Task 5", status: "Done" },
    { name: "Task 6", status: "In Progress" },
    { name: "Task 7", status: "Not Started" },
    { name: "Task 8", status: "Done" },
    { name: "Task 9", status: "Done" },
    { name: "Task 10", status: "In Progress" },
  ],
};

// Question 1
console.log(`userA has ${Object.keys(userA).length} key/value pairs`);

// Question 2
console.log(typeof userA["id"]);
console.log(typeof userA["courseId"]);

// Question 3
userA["email"] = "pparker@gmail.com";
console.log(userA["email"]);

// Question 4
function greeting(obj) {
  return `Hi, my name is ${obj["name"]}, my email is ${obj["email"]}`;
}

console.log(greeting(userA));

// Question 5
function listOfTask(obj) {
  var notStarted = obj["tasks"]
    .filter((task) => task["status"] === "Not Started")
    .map(({ name }) => name);

  var inProgress = obj["tasks"]
    .filter((task) => task["status"] === "In Progress")
    .map(({ name }) => name);

  var done = obj["tasks"]
    .filter((task) => task["status"] === "Done")
    .map(({ name }) => name);

  console.log("Not Started:");
  for (var i = 0; i <= notStarted.length - 1; i++) {
    console.log("- " + notStarted[i]);
  }

  console.log("In Progress:");
  for (var i = 0; i <= inProgress.length - 1; i++) {
    console.log("- " + inProgress[i]);
  }

  console.log("Done:");
  for (var i = 0; i <= done.length - 1; i++) {
    console.log("- " + done[i]);
  }
}

listOfTask(userA);

// Question 6
function getRandomInt(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

function getRandomItem(arr) {
  var index = getRandomInt(0, arr.length - 1);

  return arr[index];
}

function generateFakeTasks(n) {
  var tasks = [];

  for (var i = 1; i <= n; i++) {
    var status = getRandomItem(["In progress", "Not Started", "Done"]);
    tasks.push((task = { name: "Task " + i, status: status }));
  }

  return tasks;
}

userA["tasks"] = generateFakeTasks(10);

listOfTask(userA);
