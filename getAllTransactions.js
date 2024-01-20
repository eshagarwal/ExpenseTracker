const users = require('./users');

// Function to get the list of all transactions
function getAllTransactions(userName) {
  const user = users.find((user) => user.name === userName);

  return user ? user.transactions : [];
}

module.exports = getAllTransactions;

// Test cases

// Test Case 1
const transactionsShrey = getAllTransactions("Shrey");
if (transactionsShrey.length > 0) {
    console.log(transactionsShrey); // Expected Output: [100, 200, 300]
} else {
    console.log("No transactions found for Shrey.");
}

// Test Case 2
const transactionsAlfiya = getAllTransactions("Alfiya");
if (transactionsAlfiya.length > 0) {
    console.log(transactionsAlfiya);
} else {
    console.log("No transactions found for Alfiya."); // Expected Output: "No transactions found for Alfiya."
}

// Test Case 3
const transactionsJohn = getAllTransactions("John");
if (transactionsJohn.length > 0) {
    console.log(transactionsJohn);
} else {
    console.log("User John not found."); // Expected Output: "User John not found."
}

// Test Case 4
const transactionsSam = getAllTransactions("Sam");
if (transactionsSam.length > 0) {
    console.log(transactionsSam); // Expected Output: [500]
} else {
    console.log("No transactions found for Sam.");
}

// Test Case 5
const transactionsAyush = getAllTransactions("Ayush");
if (transactionsAyush.length > 0) {
    console.log(transactionsAyush); // Expected Output: [50, 75]
} else {
    console.log("No transactions found for Ayush.");
}
