const assert = require("assert");
const fs = require("fs");
const path = require("path");
const addMoney = require("./addMoney");
const usersModule = require("./users");
const { readDataFromFile, writeDataToFile } = usersModule;

// Define the test users file path
const testUsersFilePath = path.join(__dirname, "../data/users.json");

// Use a different file for testing, to avoid modifying your actual data
usersModule.usersFilePath = testUsersFilePath;

// Reset the test users file before each test
function beforeEach() {
  fs.writeFileSync(
    testUsersFilePath,
    JSON.stringify([
      { name: "Shrey", transactions: [] },
      { name: "Ayush", transactions: [] },
    ])
  );
}

// Clean up the test users file after all tests are executed
function afterAll() {
  fs.unlinkSync(testUsersFilePath);
}

// Test case: Add money for an existing user
function testAddMoney() {
  addMoney("Shrey", 50);

  // Check if the transaction was added
  const updatedUsers = readDataFromFile();
  if (
    updatedUsers[0].transactions.length === 1 &&
    updatedUsers[0].transactions[0].type === "Receive" &&
    updatedUsers[0].transactions[0].amount === 50
  ) {
    console.log("Test case passed: Add money for an existing user");
  } else {
    console.error("Test case failed: Add money for an existing user");
  }
}

function getUserTransactions(userName) {
  const users = readDataFromFile();
  const user = users.find((user) => user.name === userName);

  if (user) {
    return user.transactions;
  } else {
    return null;
  }
}

// Test case: Validate money was added
function testGetUserTransactions() {
  // Add money to the user's account
  addMoney("Shrey", 50);

  // Retrieve user transactions
  const userTransactions = getUserTransactions("Shrey");

  // Check if the transaction was added
  if (
    userTransactions &&
    userTransactions.length === 1 &&
    userTransactions[0].type === "Receive" &&
    userTransactions[0].amount === 50
  ) {
    console.log("Test case passed: Validate money was added");
  } else {
    console.error("Test case failed: Validate money was added");
  }
}

// Run the tests
beforeEach();
testAddMoney();
testGetUserTransactions(); 
afterAll();
