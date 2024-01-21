const addMoney = require("./addMoney");
const spendMoney = require("./spendMoney");
const showAllTransactions = require("./showAllTransactions");
const currentBalance = require("./currentBalance");

// Refer this helper function for test assertions
function assert(condition, message) {
  if (condition) {
    console.log(message + " - Test passed");
  } else {
    console.error(message + " - Test failed");
  }
}

// Test cases
const separator = "-".repeat(60);
console.log(separator);

console.log("Test cases to test the Expense Tracker");

function runTests() {
  // Test Case 1
  addMoney("Shrey", 100);
  assert(
    showAllTransactions("Shrey").length === 1 &&
      showAllTransactions("Shrey")[0].type === "Receive" &&
      showAllTransactions("Shrey")[0].amount === 100,
    "Test Case 1: Shrey receives 100"
  );
  assert(
    currentBalance("Shrey") === 100,
    "Test Case 1: Current balance for Shrey should be 100"
  );

  // Test Case 2
  spendMoney("Shrey", 30, "Groceries");
  assert(
    showAllTransactions("Shrey").length === 2 &&
      showAllTransactions("Shrey")[1].type === "Spend" &&
      showAllTransactions("Shrey")[1].amount === 30 &&
      showAllTransactions("Shrey")[1].purpose === "Groceries",
    "Test Case 2: Shrey spends 30 on groceries"
  );
  assert(
    currentBalance("Shrey") === 70,
    "Test Case 2: Current balance for Shrey should be 70"
  );

  // Test Case 3
  addMoney("Ayush", 50);
  assert(
    showAllTransactions("Ayush").length === 1 &&
      showAllTransactions("Ayush")[0].type === "Receive" &&
      showAllTransactions("Ayush")[0].amount === 50,
    "Test Case 3: Ayush receives 50"
  );
  assert(
    currentBalance("Ayush") === 50,
    "Test Case 3: Current balance for Ayush should be 50"
  );

  // Test Case 4
  spendMoney("Ayush", 60, "Overspending");
  assert(
    showAllTransactions("Ayush").length === 1,
    "Test Case 4: Ayush attempts to overspend"
  );
  assert(
    currentBalance("Ayush") === 50,
    "Test Case 4: Current balance for Ayush should be 50 (balance should not go below zero)"
  );

  // Test Case 5
  addMoney("Shrey", 200);
  assert(
    showAllTransactions("Shrey").length === 3 &&
      showAllTransactions("Shrey")[2].type === "Receive" &&
      showAllTransactions("Shrey")[2].amount === 200,
    "Test Case 5: Shrey receives 200"
  );
  assert(
    currentBalance("Shrey") === 270,
    "Test Case 5: Current balance for Shrey should be 270"
  );

  // Test Case 6
  spendMoney("Ayush", 20, "Dinner");
  assert(
    showAllTransactions("Ayush").length === 2 &&
      showAllTransactions("Ayush")[1].type === "Spend" &&
      showAllTransactions("Ayush")[1].amount === 20 &&
      showAllTransactions("Ayush")[1].purpose === "Dinner",
    "Test Case 6: Ayush spends 20 on dinner"
  );
  assert(
    currentBalance("Ayush") === 30,
    "Test Case 6: Current balance for Ayush should be 30"
  );

  // Test Case 7
  addMoney("Shrey", -50);
  assert(
    showAllTransactions("Shrey").length === 3,
    "Test Case 7: Try to receive negative amount (should not record transaction)"
  );
  assert(
    currentBalance("Shrey") === 270,
    "Test Case 7: Current balance for Shrey should be 270 (no change)"
  );

  // Test Case 8
  spendMoney("Ayush", -20, "InvalidExpense");
  assert(
    showAllTransactions("Ayush").length === 2,
    "Test Case 8: Try to spend negative amount (should not record transaction)"
  );
  assert(
    currentBalance("Ayush") === 30,
    "Test Case 8: Current balance for Ayush should be 30 (no change)"
  );

  // Test Case 9
  assert(
    showAllTransactions("NonExistentUser").length === 0,
    "Test Case 9: Try to get transactions for a non-existent user"
  );

  // Test Case 10
  assert(
    currentBalance("NonExistentUser") === null,
    "Test Case 10: Try to get balance for a non-existent user"
  );

  // Test Case 11
  spendMoney("Shrey", 400, "Overspending");
  assert(
    showAllTransactions("Shrey").length === 3,
    "Test Case 11: Try to spend more than the current balance"
  );
  assert(
    currentBalance("Shrey") === 270,
    "Test Case 11: Current balance for Shrey should be 270 (balance should not go below zero)"
  );
}

runTests();
