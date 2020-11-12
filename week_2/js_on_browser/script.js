function sectionOne() {
  var btnChangeContent = document.getElementById("s1-btn-content");

  btnChangeContent.addEventListener("click", function () {
    document.getElementById("s1-text").innerHTML =
      "by adding Event Listener to the button.";
  });

  var btnChangeAttribute = document.getElementById("s1-btn-attribute");

  btnChangeAttribute.addEventListener("click", function () {
    var icon = document.getElementById("s1-icon");

    if (icon.className == "far fa-heart") {
      icon.className = "fas fa-heart";
    } else {
      icon.className = "far fa-heart";
    }
  });
}

function hideSectionOne() {
  var buttons = document.querySelectorAll("#s1 .btn");

  Array.prototype.map.call(buttons, function (btn) {
    btn.classList.add("invisible");
  });
}

function sectionTwo() {
  document
    .getElementById("s2-input-name")
    .addEventListener("keyup", function (event) {
      var input = event.target;
      var span = input.parentNode.childNodes[3];
      var firstName = input.value.split(" ")[0];
      span.innerHTML = "First Name:" + firstName;
    });

  var maxLength = 10;

  document
    .getElementById("s2-input-email")
    .addEventListener("keyup", function (event) {
      var input = event.target;
      var span = input.parentNode.childNodes[3];

      if (event.key === " ") {
        span.innerHTML = "Space is invalid.";
        span.style.color = "red";
        input.value = input.value.split(" ").join("");
        return;
      }

      if (input.value.length <= maxLength) {
        span.innerHTML = `${maxLength - input.value.length} character(s) left.`;
        span.style.color = "green";
      } else {
        input.value = input.value.slice(0, maxLength);
      }
    });

  document
    .getElementById("s2-btn-reset")
    .addEventListener("click", function () {
      var inputBoxes = document.querySelectorAll(".input-group input");

      Array.prototype.map.call(inputBoxes, function (input) {
        input.value = "";
      });

      var inputLabels = document.querySelectorAll(".input-group span");

      inputLabels[0].innerHTML = "First Name:";
      inputLabels[1].innerHTML = "Maximum 10 characters";
      inputLabels[1].style.color = "black";
    });
}

function addItem() {
  var item = document.createElement("li");

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  var label = document.createElement("label");
  label.innerHTML = "New Items";
  label.insertBefore(checkbox, label.childNodes[0]);

  item.appendChild(label);

  document.getElementById("s3-list").appendChild(item);
}

function sectionThree() {
  document.getElementById("s3-btn-add").addEventListener("click", addItem);
}

sectionOne();
sectionTwo();
sectionThree();
