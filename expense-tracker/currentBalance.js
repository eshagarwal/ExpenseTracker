const fs = require("fs");
const path = require("path");
const users = require("./users");

// Function to get the current balance
function currentBalance(userName) {
  const user = users.find((user) => user.name === userName);

  if (user) {
    const transactionFiles = getTransactionFiles(userName);
    const transactions = transactionFiles.map((file) => {
      const filePath = path.join(__dirname, `../data/transactions/${file}`);
      const transactionData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(transactionData);
    });

    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === "Receive" ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    return balance;
  } else {
    console.error(`User '${userName}' not found.`);
    return null;
  }
}

function getTransactionFiles(userName) {
  const transactionPath = path.join(__dirname, `../data/transactions`);
  const files = fs.readdirSync(transactionPath);

  return files.filter((file) => file.startsWith(`${userName}_`));
}

module.exports = currentBalance;


// Test cases
function runCurrentBalanceTests() {
  const separator = "-".repeat(60);
  console.log(separator);

  console.log("Test cases to test the currentBalance function:");

  // Test case 1: Get balance for a user with multiple transactions
  users[1].transactions = [
    { type: "Receive", amount: 30 },
    { type: "Spend", amount: 10 },
    { type: "Receive", amount: 20 },
  ];

  const balance = currentBalance("Ayush");

  // Check if the balance is calculated correctly
  if (balance === 40) {
    console.log("Test case 1 passed");
  } else {
    console.error("Test case 1 failed");
  }

  // Test case 2: Get balance for a non-existing user
  const nonExistingUserBalance = currentBalance("NonExistingUser");

  // Check if an error message was logged and the returned value is null
  if (nonExistingUserBalance === null) {
    console.log("Test case 2 passed");
  } else {
    console.error("Test case 2 failed");
  }

  console.log("Current Balance: " + currentBalance("Ayush"));
}

// runCurrentBalanceTests()
