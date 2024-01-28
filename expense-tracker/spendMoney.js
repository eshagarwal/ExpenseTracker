const fs = require("fs");
const path = require("path");
const users = require("./users");

// Function to add money spent
function spendMoney(userName, amount, purpose) {
  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    const transaction = { type: "Spend", date, amount, purpose };

    // Save transaction to a file
    saveTransactionToFile(user.name, transaction);

    user.transactions.push(transaction);
  } else {
    console.error(`User '${userName}' not found.`);
  }
}

function saveTransactionToFile(userName, transaction) {
  const transactionId = generateUniqueId();
  const fileName = path.join(__dirname, `../data/transactions/${userName}_${transactionId}.json`);

  fs.writeFileSync(fileName, JSON.stringify(transaction, null, 2));
}

function generateUniqueId() {
  // Generate a unique ID (you can use a library for more robust generation)
  return Math.random().toString(36).substr(2, 9);
}

module.exports = spendMoney;


// Test cases
function runSpendMoneyTests() {
  const separator = "-".repeat(60);
  console.log(separator);

  console.log("Test cases to test the spendMoney function:");

  // Test case 1: Spend money for an existing user
  spendMoney("Shrey", 50, "Groceries");

  // Check if the transaction was added
  if (
    users[0].transactions.length === 1 &&
    users[0].transactions[0].type === "Spend" &&
    users[0].transactions[0].amount === 50 &&
    users[0].transactions[0].purpose === "Groceries"
  ) {
    console.log("Test case 1 passed");
  } else {
    console.error("Test case 1 failed");
  }

  // Test case 2: Spend money for a non-existing user
  spendMoney("John", 100, "Clothing");

  // Check if an error message was logged
  if (users[users.length - 1].transactions.length === 0) {
    console.log("Test case 2 passed");
  } else {
    console.error("Test case 2 failed");
  }
}

// runSpendMoneyTests()
