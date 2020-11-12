function addTask() {
  var taskValue = document.getElementById("task-value").value;
  if (taskValue) {
    var task = document.createElement("li");
    task.classList.add("task");
    task.classList.add("fill");
    task.setAttribute("draggable", "true");
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);

    var taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    taskContent.innerText = taskValue;

    // Delete button
    var trash = document.createElement("i");
    trash.classList += "fas fa-times-circle trash";
    trash.addEventListener("click", removeTask);

    // Edit button
    var edit = document.createElement("i");
    edit.classList += "fas fa-edit edit";
    edit.addEventListener("click", function (event) {
      editTask(event, taskContent);
    });

    // In Progress button
    var btn1 = document.createElement("i");
    btn1.classList += "fas fa-hourglass-start btn1";
    btn1.addEventListener("click", function (event) {
      switchColumn(task, "inProgress");
    });

    // Review button
    var btn2 = document.createElement("i");
    btn2.classList += "fas fa-user-check btn2";
    btn2.addEventListener("click", function (event) {
      switchColumn(task, "review");
    });

    // Done button
    var btn3 = document.createElement("i");
    btn3.classList += "fas fa-check btn3";
    btn3.addEventListener("click", function (event) {
      switchColumn(task, "done");
    });

    task.appendChild(taskContent);
    task.appendChild(trash);
    task.appendChild(edit);
    task.appendChild(btn1);
    task.appendChild(btn2);
    task.appendChild(btn3);

    var tasks = document.getElementById("tasks-added");
    tasks.insertBefore(task, tasks.childNodes[0]);
  }

  document.getElementById("task-value").value = "";
}

function removeTask(event) {
  // event represents the remove button
  // Access the <ul> list by moving 2 levels up
  var tasks = event.target.parentNode.parentNode;
  // Access the <li> element which is the direct parent
  var task = event.target.parentNode;
  tasks.removeChild(task);
}

// Toggle add/edit form
function toggleForm(add, edit) {
  // Get Add form's display attribute
  var addDisplay = window.getComputedStyle(add).getPropertyValue("display");

  if (addDisplay === "flex") {
    add.style.display = "none";
    edit.style.display = "flex";
  } else {
    add.style.display = "flex";
    edit.style.display = "none";
  }
}

// Edit task function
function editTask(event, taskContent) {
  var addForm = document.getElementById("add-task-form");
  var editForm = document.getElementById("edit-task-form");

  // Hide edit button
  document.getElementsByClassName("edit")[0].style.display = "none";

  // Show edit form
  toggleForm(addForm, editForm);

  // Add old task name to place holder
  var editBox = document.getElementById("edit-value");
  editBox.placeholder += taskContent.innerHTML;

  // Update task name on Enter
  editBox.addEventListener("keypress", function (e) {
    var input = e.target;
    if (e.key == "Enter") {
      taskContent.innerHTML = input.value;

      // Show Add form
      toggleForm(addForm, editForm);
    }
  });

  // Update task name on clicking button
  document.getElementById("edit-task").addEventListener("click", function () {
    taskContent.innerHTML = document.getElementById("edit-value").value;

    // Show Add form
    toggleForm(addForm, editForm);
  });
}

function switchColumn(task, target) {
  var columns = document.getElementById("columns");
  console.log(columns.childNodes);
}

// DRAG & DROP

// A global variable to store the selected task
var task;

function dragStart(event) {
  event.target.className += " hold";
  task = event.target;
  setTimeout(() => (event.target.className = "invisible"), 0);
}

function dragEnd(event) {
  event.target.className = "task fill";
}

function dragEnter(event) {
  event.preventDefault();
  if (event.target.className === "column dropzone") {
    event.target.className += " hovered";
  }
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave(event) {
  if (event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone";
  }
}

function dragDrop(event) {
  if (event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone";
  }
  // event represents the column
  // Add the task to the second element of the column which is the <ul> element (the first one is a <h1>)
  event.target.childNodes[1].append(task);
}

var dropzones = document.querySelectorAll(".dropzone");

for (let index = 0; index < dropzones.length; index++) {
  const dropzone = dropzones[index];
  dropzone.addEventListener("dragenter", dragEnter);
  dropzone.addEventListener("dragover", dragOver);
  dropzone.addEventListener("dragleave", dragLeave);
  dropzone.addEventListener("drop", dragDrop);
}

document.getElementById("add-task").addEventListener("click", addTask);

// Add task on Enter
document
  .getElementById("task-value")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") addTask();
  });
