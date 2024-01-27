const users = require("./users");

// Function to show the list of all transactions
function showAllTransactions(userName, callback) {
  const user = users.find((user) => user.name === userName);

  if (user) {
    const transactions = user.transactions;
    callback(`All transactions for user '${userName}': ${JSON.stringify(transactions)}`);
  } else {
    callback(`User '${userName}' not found.`);
  }
}

module.exports = showAllTransactions;

// Test cases
function runShowAllTransactionsTests() {
  const separator = "-".repeat(60);
  console.log(separator);

  console.log("Test cases to test the showAllTransactions function:");

  // Test Case 1
  const transactionsShrey = showAllTransactions("Shrey");
  if (transactionsShrey.length > 0) {
    console.log(transactionsShrey); // Expected Output: [100, 200, 300]
  } else {
    console.log("No transactions found for Shrey.");
  }

  // Test Case 2
  const transactionsAlfiya = showAllTransactions("Alfiya");
  if (transactionsAlfiya.length > 0) {
    console.log(transactionsAlfiya);
  } else {
    console.log("No transactions found for Alfiya."); // Expected Output: "No transactions found for Alfiya."
  }

  // Test Case 3
  const transactionsJohn = showAllTransactions("John");
  if (transactionsJohn.length > 0) {
    console.log(transactionsJohn);
  } else {
    console.log("User John not found."); // Expected Output: "User John not found."
  }

  // Test Case 4
  const transactionsSam = showAllTransactions("Sam");
  if (transactionsSam.length > 0) {
    console.log(transactionsSam); // Expected Output: [500]
  } else {
    console.log("No transactions found for Sam.");
  }

  // Test Case 5
  const transactionsAyush = showAllTransactions("Ayush");
  if (transactionsAyush.length > 0) {
    console.log(transactionsAyush); // Expected Output: [50, 75]
  } else {
    console.log("No transactions found for Ayush.");
  }
}

// runShowAllTransactionsTests()
