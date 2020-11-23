// API Keys
const keyWCI = "rp2x6jfDMyj7oYA4gnEaWEiDKN9ItCSnnoi"; // API Key for WorldCoinIndex
const keyEx = "7b0790b6e61992437d55a39622abdbcb"; // API Key for Currency Exchange

const urlWCI = `https://www.worldcoinindex.com/apiservice/v2getmarkets?key=${keyWCI}&fiat=vnd`; // API URL for for WorldCoinIndex
const urlEx = `https://data.fixer.io/api/latest?access_key=${keyEx}`; // API URL for Currency Exchange

let selectedCurrency;
let selectedAmount;
let currencyList;
let cryptoList;
let filterCrypto;
let startIndex = 0;
let tempCryptolist;

// 1. Helper Functions
// 1a. Get a list of available currencies from Currency Exchange API
async function getCurrency() {
  const response = await fetch(urlEx);
  const data = await response.json();

  // Convert to USD base
  const usdRate = data.rates.USD;

  for (const c in data.rates) {
    data.rates[c] /= usdRate;
  }

  return data.rates; // Object - Each item is a currency code & its exchange rate to USD
}

// 1b. Get a list of all Crytocurrencies from WorldCoinIndex API
async function getCrypto() {
  const response = await fetch(urlWCI);
  const data = await response.json();

  cryptoList = data.Markets[0];
  tempCryptolist = cryptoList; // Array containing multiple objects, each has currency name, price in USD and liquidity rate
  // Object format:
  // {name: "CurrencyName",
  //  price: price,
  //  liquidity: liquidity}
}

async function getFlag(arr) {
  let results = [];

  for (let i = 0; i < arr.length; i++) {
    let c = arr[i];
    try {
      const url = `https://restcountries.eu/rest/v2/currency/${c}`;
      const response = await fetch(url);
      const data = await response.json();
      results.push({ currency: c, country: data[0].name, flag: data[0].flag });
    } catch {
      results.push({ currency: c, country: "Not Found", flag: "Not Found" });
    }
  }

  return results;
}

// 2. User Input Section
// let currencies = getCurrency(); // Get data from Currency Exchange API

// 2a. Add title, other instructions (if needed to document (html file))
let title = document.createElement("h1");
title.classList = "col";
title.innerHTML = "Cryptocurrency Exchange";
document.getElementById("title-section").append(title);

// 2b. Get the list of currency names
let getCurrencyNames = async () => {
  currencyList = await getCurrency();
  return Object.keys(currencyList);
};

// 2c. Put the list of currency names inside a Drop List (Use Bootstrap)
let generateDropList = async () => {
  let currencyNames = await getCurrencyNames();
  let dropMenu = document.getElementById("currency-dropdown");
  currencyNames = await getFlag(currencyNames);

  currencyNames.forEach((c) => {
    selection = document.createElement("div");
    selection.classList = "selection";
    option = document.createElement("a");
    option.classList = "dropdown-item";
    option.innerHTML = `${c.currency} - ${c.country}`;

    option.addEventListener("click", (e) => {
      let dropMenu = document.getElementById("dropdownMenuButton");
      selectedCurrency = e.target.innerHTML.split(" -")[0];
      dropMenu.innerHTML = e.target.innerHTML;
    });

    flag = document.createElement("img");
    flag.src = c.flag;
    flag.style.width = "20px";
    flag.style.height = "10px";

    selection.appendChild(flag);
    selection.appendChild(option);
    dropMenu.appendChild(selection);
  });
};

// 2d. Create Input box for Amount
// YOUR CODE HERE

// 2e. Create Submit button
function generateSubmitBtn() {
  let submitBtn = document.getElementById("submit-button");

  // On click, the button will:
  submitBtn.addEventListener("click", function () {
    // 2e-1. Get the user input values
    selectedAmount = document.getElementById("amount-input").value;

    if (!selectedAmount || !selectedCurrency) {
      if (!selectedAmount) {
        let amountLabel = document.getElementById("amount-label");
        amountLabel.innerHTML = "Please enter a desired amount.";
        amountLabel.style.color = "red";
      }
      if (!selectedAmount) {
        let currencyLabel = document.getElementById("currency-label");
        currencyLabel.innerHTML = "Please select a desired currency.";
        currencyLabel.style.color = "red";
      }
    }

    createTable();
    createNavigation();
    // selectedCurrency is an object from the list currencies.
    // It has two properties: currency name and its exchange rate to USD

    // 2e-2. Hide all current component (2a, 2b, 2c, 2d, 2e)
    // YOUR CODE HERE

    // Display result table
    // displayTable(amount, selectedCurrency);
  });

  // 2f. Add all components (2a, 2b, 2c, 2d, 2e) to document
  // YOUR CODE HERE
}

function createNavigation() {
  if (document.getElementsByTagName("nav").length > 0) {
    Array.prototype.slice
      .call(document.getElementsByTagName("nav"))
      .forEach((x) => x.remove());
  }
  // add navigation field
  let navigation = document.createElement("nav");
  navigation.classList.add("navigation", "navbar", "navbar-light");
  // navigation.style.backgroundColor = "#e3f2fd";
  navigation.innerHTML = `
    <div class="navigate-btn">
      <button type="button" class="btn btn-secondary next-prev" id="prev">Previous</button>
      <button type="button" class="btn btn-secondary next-prev" id="next">Next</button>
    </div>
    
  `;
  document.getElementById("main").appendChild(navigation);
  let search = document.createElement("nav");
  search.classList.add("navigation", "navbar", "navbar-light");
  // search.style.backgroundColor = "#e3f2fd";
  search.innerHTML = `
    <div>
      <input
        type="text"
        class="search-crypto-input"
        placeholder="Search Cryptocurrency"
        id="search-box"
      />
      <button type="button" class="search-crypto-btn btn btn-success" id="search-btn">Search</button>
    </div>
  
  `;
  document.getElementById("main").appendChild(search);
  document.getElementById("next").addEventListener("click", function () {
    startIndex += 10;
    createTable();
    createNavigation();
  });
  document.getElementById("prev").addEventListener("click", function () {
    startIndex -= 10;
    createTable();
    createNavigation();
  });

  console.log("startindex", startIndex);
  console.log("length", tempCryptolist.length);
  if (tempCryptolist.length <= startIndex + 10) {
    document.getElementById("next").remove();
  }

  if (startIndex === 0) {
    document.getElementById("prev").remove();
  }

  document.getElementById("search-btn").addEventListener("click", function () {
    filterCrypto = document.getElementById("search-box").value;
    startIndex = 0;
    createTable();
    createNavigation();
  });
}

function createTable() {
  // Create table
  if (document.getElementsByTagName("table").length > 0) {
    Array.prototype.slice
      .call(document.getElementsByTagName("table"))
      .forEach((x) => x.remove());
  }

  let table = document.createElement("table");
  table.classList = "table table-striped table-bordered";

  const tableHeader = `
    <thead class="thead-dark">
    <tr>
      <th scope="col">Cryptocurrency Name</th>
      <th scope="col">Code</th>
      <th scope="col">Price in USD</th>
      <th scope="col">Liquidity rate</th>
      <th scope="col">Exchange to ${selectedCurrency}</th>
    </tr>
    </thead>
  `;

  tempCryptolist = cryptoList;

  if (filterCrypto) {
    tempCryptolist = cryptoList.filter(
      (x) =>
        x.Label.toLowerCase().startsWith(filterCrypto.toLowerCase()) ||
        x.Name.toLowerCase().startsWith(filterCrypto.toLowerCase())
    );
  }

  let maxRow;

  if (tempCryptolist.length < startIndex + 10) {
    maxRow = tempCryptolist.length - startIndex;
  } else {
    maxRow = 10;
  }
  console.log(maxRow);
  if (tempCryptolist.length > 0) {
    let dataItems = ["Name", "Label", "Price", "Volume_24h"];
    // create table body: 10 rows * 4 columns
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < maxRow; i++) {
      let index = startIndex + i;
      // how many rows to create, in this case: 10 rows
      let tableRow = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
        // how many columns to create, in this case: 4 columns
        let tableData = document.createElement("td");
        if (j < 4) {
          tableData.innerHTML = tempCryptolist[index][dataItems[j]];
        } else {
          tableData.innerHTML =
            parseInt(selectedAmount) /
            (tempCryptolist[index]["Price"] * currencyList[selectedCurrency]);
        }

        tableRow.appendChild(tableData);
      }
      tableBody.appendChild(tableRow);
    }
    table.innerHTML = tableHeader;
    table.appendChild(tableBody);
    document.getElementById("main").appendChild(table);
  }
}

// 3. Result table
function displayTable(amount, selectedCurrency) {
  // 3a. For each item in cryptos, calculate the exchanged amount
  // exchanged amount = cryptocurrency price in USD * amount * exchange rate of selected currency to USD
  // YOUR CODE HERE

  // 3b. Create and display table
  // The table contains 4 columns: crytocurrency name, price in USD, liquidity, exchanged in amount in {selectedCurrency.name}
  // The table contains 10 rows: first 10 crytocurrencies from crytos
  ///////////
  // 3c. Next & Previous button: when clicked will display the next/previous 10 items from cryptos on the table
  // YOUR CODE HERE
  //////////
  // 3d. Search box, when typed in will look for crytocurrency(s) with matching name
  // YOUR CODE HERE
  ///////
  createNavigation();
  createTable();

  // 3e. Add all components to document (3b, 3c, 3d)
  // YOUR CODE HERE
  let submitBtn = document.getElementById("submit-button");
  submitBtn.addEventListener("click", function () {
    // remove the user input section, this remove my placeholder nav in html
    // In completed project, its functionality is removing the starting page before loading table
    // let inputField = submitBtn.parentNode.parentNode;
    // header.removeChild(inputField);

    // create the navigation bar that contain previous/next buttons (3c) and
    // search box (3d) to navigate the table
    createNavigation();

    // create table displaying crypto and their prices (3b)
    createTable();
  });
}

async function main() {
  // Limit characters of Amount Input
  let amountInput = document.getElementById("amount-input");
  amountInput.addEventListener("keydown", function (e) {
    if ((e.keyCode < 48 && ![8, 9].includes(e.keyCode)) || e.keyCode > 57) {
      e.preventDefault();
    }
  });
  await getCrypto();
  generateDropList();
  generateSubmitBtn();
  // displayTable();
}

main();
