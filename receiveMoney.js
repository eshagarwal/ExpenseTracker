const users = require('./users');

// Function to add money received
function receiveMoney(userName, amount) {
  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    user.transactions.push({ type: "Receive", date, amount });
  } else {
    console.error(`User '${userName}' not found.`);
  }
}

module.exports = receiveMoney;

// Test cases for receiveMoney
// Test case 1: Add money for an existing user
receiveMoney("Shrey", 50);

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
receiveMoney("John", 100);

//Check if an error message was logged
if (users[users.length - 1].transactions.length === 0) {
  console.log("Test case 2 passed");
} else {
  console.error("Test case 2 failed");
}
