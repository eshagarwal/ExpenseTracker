const receiveMoney = require("./receiveMoney");
const spendMoney = require("./spendMoney");
const getAllTransactions = require("./getAllTransactions");
const getCurrentBalance = require("./getCurrentBalance");

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

console.log("Test cases to test the Expense Tracker")

function runTests() {
  // Test Case 1
  receiveMoney("Shrey", 100);
  assert(
    getAllTransactions("Shrey").length === 1 &&
      getAllTransactions("Shrey")[0].type === "Receive" &&
      getAllTransactions("Shrey")[0].amount === 100,
    "Test Case 1: Shrey receives 100"
  );
  assert(
    getCurrentBalance("Shrey") === 100,
    "Test Case 1: Current balance for Shrey should be 100"
  );

  // Test Case 2
  spendMoney("Shrey", 30, "Groceries");
  assert(
    getAllTransactions("Shrey").length === 2 &&
      getAllTransactions("Shrey")[1].type === "Spend" &&
      getAllTransactions("Shrey")[1].amount === 30 &&
      getAllTransactions("Shrey")[1].purpose === "Groceries",
    "Test Case 2: Shrey spends 30 on groceries"
  );
  assert(
    getCurrentBalance("Shrey") === 70,
    "Test Case 2: Current balance for Shrey should be 70"
  );

  // Test Case 3
  receiveMoney("Ayush", 50);
  assert(
    getAllTransactions("Ayush").length === 1 &&
      getAllTransactions("Ayush")[0].type === "Receive" &&
      getAllTransactions("Ayush")[0].amount === 50,
    "Test Case 3: Ayush receives 50"
  );
  assert(
    getCurrentBalance("Ayush") === 50,
    "Test Case 3: Current balance for Ayush should be 50"
  );

  // Test Case 4
  spendMoney("Ayush", 60, "Overspending");
  assert(
    getAllTransactions("Ayush").length === 1,
    "Test Case 4: Ayush attempts to overspend"
  );
  assert(
    getCurrentBalance("Ayush") === 50,
    "Test Case 4: Current balance for Ayush should be 50 (balance should not go below zero)"
  );

  // Test Case 5
  receiveMoney("Shrey", 200);
  assert(
    getAllTransactions("Shrey").length === 3 &&
      getAllTransactions("Shrey")[2].type === "Receive" &&
      getAllTransactions("Shrey")[2].amount === 200,
    "Test Case 5: Shrey receives 200"
  );
  assert(
    getCurrentBalance("Shrey") === 270,
    "Test Case 5: Current balance for Shrey should be 270"
  );

  // Test Case 6
  spendMoney("Ayush", 20, "Dinner");
  assert(
    getAllTransactions("Ayush").length === 2 &&
      getAllTransactions("Ayush")[1].type === "Spend" &&
      getAllTransactions("Ayush")[1].amount === 20 &&
      getAllTransactions("Ayush")[1].purpose === "Dinner",
    "Test Case 6: Ayush spends 20 on dinner"
  );
  assert(
    getCurrentBalance("Ayush") === 30,
    "Test Case 6: Current balance for Ayush should be 30"
  );

  // Test Case 7
  receiveMoney("Shrey", -50);
  assert(
    getAllTransactions("Shrey").length === 3,
    "Test Case 7: Try to receive negative amount (should not record transaction)"
  );
  assert(
    getCurrentBalance("Shrey") === 270,
    "Test Case 7: Current balance for Shrey should be 270 (no change)"
  );

  // Test Case 8
  spendMoney("Ayush", -20, "InvalidExpense");
  assert(
    getAllTransactions("Ayush").length === 2,
    "Test Case 8: Try to spend negative amount (should not record transaction)"
  );
  assert(
    getCurrentBalance("Ayush") === 30,
    "Test Case 8: Current balance for Ayush should be 30 (no change)"
  );

  // Test Case 9
  assert(
    getAllTransactions("NonExistentUser").length === 0,
    "Test Case 9: Try to get transactions for a non-existent user"
  );

  // Test Case 10
  assert(
    getCurrentBalance("NonExistentUser") === null,
    "Test Case 10: Try to get balance for a non-existent user"
  );

  // Test Case 11
  spendMoney("Shrey", 400, "Overspending");
  assert(
    getAllTransactions("Shrey").length === 3,
    "Test Case 11: Try to spend more than the current balance"
  );
  assert(
    getCurrentBalance("Shrey") === 270,
    "Test Case 11: Current balance for Shrey should be 270 (balance should not go below zero)"
  );

}

runTests();
