let startAmount = 1000;
let transactions = [
  { currency: "USD", amount: 12, type: "withdrawal" },
  { currency: "USD", amount: 104, type: "withdrawal" },
  { currency: "USD", amount: 150, type: "deposit" },
  { currency: "USD", amount: 150, type: "deposit" },
  { currency: "USD", amount: 250, type: "withdrawal" },
  { currency: "USD", amount: 500, type: "deposit" },
  { currency: "USD", amount: 447, type: "withdrawal" },
  { currency: "USD", amount: 120, type: "deposit" },
  { currency: "USD", amount: 58, type: "withdrawal" },
  { currency: "USD", amount: 90, type: "withdrawal" },
];
const usdToVND = 23000;

// 1.
let balance = startAmount;

actions = {
  withdrawal: "withdrew",
  deposit: "deposited",
};

console.log(`Balance: ${balance}
Transaction history:`);

transactions.forEach(function (x) {
  let newBalance = balance;
  if (x.type === "withdrawal") {
    newBalance -= x.amount;
  } else {
    newBalance += x.amount;
  }

  console.log(
    `- You ${actions[x.type]} $${x.amount}. The new balance is $${newBalance}`
  );
  balance = newBalance;
});

// 2.
let finalBalance = transactions.reduce(function (accumulator, x) {
  if (x.type === "withdrawal") {
    return accumulator - x.amount;
  } else {
    return accumulator + x.amount;
  }
}, startAmount);

console.log(`Final Balance: $${finalBalance}`);

// 3.
for (let i = 0; i < 2; i++) {
  let transType = ["withdrawal", "deposit"][i];

  let totalAmount = transactions
    .filter((x) => x.type === transType)
    .reduce((a, x) => a + x.amount, 0);

  console.log(
    `${
      transType.charAt(0).toUpperCase() + transType.slice(1)
    } Amount: $${totalAmount}`
  );
}

// 4.
console.log(
  transactions.map(function (x) {
    return { currency: "VND", amount: x.amount * usdToVND, type: x.type };
  })
);

// 5.
console.log(
  transactions.sort(function (a, b) {
    if (a.type < b.type) {
      return -1;
    } else {
      return 1;
    }
  })
);

// 6.
console.log(
  `Sorted withdrawal: ${transactions
    .filter((x) => x.type == "withdrawal")
    .map((x) => x.amount)
    .sort((a, b) => a - b)
    .reduce((a, x) => a + x + ", ", "")
    .slice(0, -2)}`
);

console.log(
  `Sorted deposit: ${transactions
    .filter((x) => x.type == "deposit")
    .map((x) => x.amount)
    .sort((a, b) => a - b)
    .reduce((a, x) => a + x + ", ", "")
    .slice(0, -2)}`
);
