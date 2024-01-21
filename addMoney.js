const users = require("./users");

// Function to add money received
function addMoney(userName, amount) {
  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    user.transactions.push({ type: "Receive", date, amount });
  } else {
    console.error(`User '${userName}' not found.`);
  }
}

module.exports = addMoney;

// Test cases
function runAddMoneyTests() {
  const separator = "-".repeat(60);
  console.log(separator);

  console.log("Test cases to test the addMoney function:");

  // Test case 1: Add money for an existing user
  addMoney("Shrey", 50);

  //Check if the transaction was added
  if (
    users[0].transactions.length === 1 &&
    users[0].transactions[0].type === "Receive" &&
    users[0].transactions[0].amount === 50
  ) {
    console.log("Test case 1 passed");
  } else {
    console.error("Test case 1 failed");
  }

  // Test case 2: Add money for a non-existing user
  addMoney("John", 100);

  //Check if an error message was logged
  if (users[users.length - 1].transactions.length === 0) {
    console.log("Test case 2 passed");
  } else {
    console.error("Test case 2 failed");
  }
}

// runAddMoneyTests()
