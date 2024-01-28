const fs = require("fs");
const path = require("path");
const users = require("./users");

// Function to add money received
function addMoney(userName, amount) {
  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    const transaction = { type: "Receive", date, amount };

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

module.exports = addMoney;
