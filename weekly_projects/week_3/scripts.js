// API Keys
const keyWCI = "rp2x6jfDMyj7oYA4gnEaWEiDKN9ItCSnnoi"; // API Key for WorldCoinIndex
const keyEx = ""; // API Key for Currency Exchange

const urlWCI = `https://www.worldcoinindex.com/apiservice/v2getmarkets?key=${keyWCI}&fiat=vnd`; // API URL for for WorldCoinIndex
const urlEx = ``; // API URL for Currency Exchange

// 1. Helper Functions
// 1a. Get a list of available currencies from Currency Exchange API
function getCurrency() {
  // YOUR CODE HERE

  return arr; // Array containing multiple objects, each has 2 properties: currency name and its exchange rate to USD
  // Object format:
  // {name: "CurrencyName",
  //  exchangeRate: exchangeRate}
}

// 1b. Get a list of all Crytocurrencies from WorldCoinIndex API
function getCrypto() {
  // YOUR CODE HERE

  return; // Array containing multiple objects, each has currency name, price in USD and liquidity rate
  // Object format:
  // {name: "CurrencyName",
  //  price: price,
  //  liquidity: liquidity}
}

// 2. User Input Section
let currencies = getCurrency(); // Get data from Currency Exchange API

// 2a. Add title, other instructions (if needed to document (html file))
// YOUR CODE HERE

// 2b. Get the list of currency names
let currencyNames; // YOUR CODE HERE

// 2c. Put the list of currency names inside a Drop List (Use Bootstrap)
// YOUR CODE HERE

// 2d. Create Input box for Amount
// YOUR CODE HERE

// 2e. Create Submit button
let submitBtn = document.createElement("button");
// Add id/class to submitBtn
// YOUR CODE HERE

// On click, the button will:
submitBtn.addEventListener("click", function () {
  // 2e-1. Get the user input values
  let amount; // YOUR CODE HERE
  let selectedCurrency; // YOUR CODE HERE
  // selectedCurrency is an object from the list currencies.
  // It has two properties: currency name and its exchange rate to USD

  // 2e-2. Hide all current component (2a, 2b, 2c, 2d, 2e)
  // YOUR CODE HERE

  // Display result table
  displayTable(amount, selectedCurrency);
});

// 2f. Add all components (2a, 2b, 2c, 2d, 2e) to document
// YOUR CODE HERE

// 3. Result table
function displayTable(amount, selectedCurrency) {
  // YOUR CODE HERE
  // Get the list of cryptocurrencies (1b)
  let cryptos = getCrypto();

  // 3a. For each item in cryptos, calculate the exchanged amount
  // exchanged amount = cryptocurrency price in USD * amount * exchange rate of selected currency to USD
  // YOUR CODE HERE

  // 3b. Create and display table
  // The table contains 4 columns: crytocurrency name, price in USD, liquidity, exchanged in amount in {selectedCurrency.name}
  // The table contains 10 rows: first 10 crytocurrencies from crytos

  // 3c. Next & Previous button: when clicked will display the next/previous 10 items from cryptos on the table
  // YOUR CODE HERE

  // 3d. Search box, when typed in will look for crytocurrency(s) with matching name
  // YOUR CODE HERE

  // 3e. Add all components to document (3b, 3c, 3d)
  // YOUR CODE HERE
}
