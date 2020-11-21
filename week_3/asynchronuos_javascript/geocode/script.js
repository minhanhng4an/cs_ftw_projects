// Authorization Key
const key = "105776920258548e15770782x115244";

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

async function whereAmI() {
  // Get long & lat
  getPosition().then(async function (geo) {
    const { latitude, longitude } = geo.coords;
    message = document.getElementById("btn-message");
    message.innerHTML = "Please Wait...";

    try {
      // Get location
      let url = `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=${key}`;
      let response = await fetch(url);
      let result = await response.json();

      // Get flag
      let urlFlag = `http://restcountries.eu/rest/v2/name/${result.country
        .split(" ")[0]
        .toLowerCase()}`;
      let responseFlag = await fetch(urlFlag);
      let resultFlag = await responseFlag.json();

      // Update page
      message.innerHTML = `You are in ${result.region}, ${result.country}.`;

      imageFlag = document.getElementById("flag-img");
      if (!imageFlag) {
        imageFlag = document.createElement("img");
        imageFlag.id = "flag-img";
      }

      imageFlag.src = resultFlag[0].flag;

      let main = document.getElementsByTagName("main")[0];
      main.append(imageFlag);
    } catch (err) {
      message.style.color = "#e74c3c";
      message.innerHTML = err;
    }
  });
}

let main = document.createElement("main");

let message = document.createElement("p");
message.id = "btn-message";
message.innerHTML = "Click button to get location";

let button = document.createElement("button");
button.id = "loc-btn";
button.innerHTML = "Start";
button.addEventListener("click", whereAmI);

main.append(message);
main.append(button);
document.body.append(main);
