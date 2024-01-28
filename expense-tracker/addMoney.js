const fs = require("fs");
const path = require("path");
const users = require("./users");

// Function to add money received
function addMoney(userName, amount) {
  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    const transaction = { userName, type: "Receive", date, amount };

    // Save transaction to a file
    saveTransactionToFile(user.name, transaction);

    user.transactions.push(transaction);
  } else {
    console.error(`User '${userName}' not found.`);
  }
}

function saveTransactionToFile(userName, transaction) {
  const transactionId = generateUniqueId();
  const fileName = path.join(__dirname, `../data/transactions/${transactionId}.json`);

  fs.writeFileSync(fileName, JSON.stringify(transaction, null, 2));
}

function generateUniqueId() {
  // Generate a unique ID (you can use a library for more robust generation)
  return Math.random().toString(36).substr(2, 9);
}

module.exports = addMoney;

// Test cases
function runAddMoneyTests() {
  const separator = "-".repeat(60);
  console.log(separator);

  console.log("Test cases to test the addMoney function:");

  // Test case 1: Add money for an existing user
  addMoney("Shrey", 50);

  // Check if the transaction was added
  if (
    users[0].transactions.length === 1 &&
    users[0].transactions[0].type === "Receive" &&
    users[0].transactions[0].amount === 50
  ) {
    console.log("Test case 1 passed: the transaction is added");
  } else {
    console.error("Test case 1 failed");
  }

  // Test case 2: Add money for a non-existing user
  addMoney("John", 100);

  // Check if an error message was logged
  if (users[users.length - 1].transactions.length === 0) {
    console.log("Test case 2 passed: Error message logged");
  } else {
    console.error("Test case 2 failed");
  }

  // Test case 3: Validate if money is added
  addMoney("Alfiya", 75);

  // Check if the transaction was added
  if (
    users[2].transactions.length === 1 &&
    users[2].transactions[0].type === "Receive" &&
    users[2].transactions[0].amount === 75
  ) {
    console.log("Test case 3 passed: the transaction is added");
  } else {
    console.error("Test case 3 failed");
  }
}

// runAddMoneyTests();