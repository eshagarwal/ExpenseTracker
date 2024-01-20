// Expense Tracker using functional programming
const users = [
    { name: 'Shrey', transactions: [] },
    { name: 'Ayush', transactions: [] },
    { name: 'Alfiya', transactions: [] },
    { name: 'Sam', transactions: [] }
  ];
  
  // Function to add money received
  function receiveMoney(userName, amount) {
    const user = users.find(user => user.name === userName);
  
    if (user) {
      const date = new Date();
      user.transactions.push({ type: 'Receive', date, amount });
    } else {
      console.error(`User '${userName}' not found.`);
    }
  }
  
  // Function to add money spent
  function spendMoney(userName, amount, purpose) {
    const user = users.find(user => user.name === userName);
  
    if (user) {
      const date = new Date();
      user.transactions.push({ type: 'Spend', date, amount, purpose });
    } else {
      console.error(`User '${userName}' not found.`);
    }
  }
  
  // Function to get the list of all transactions
  function getAllTransactions(userName) {
    const user = users.find(user => user.name === userName);
  
    return user ? user.transactions : [];
  }
  
  // Function to get the current balance
  function getCurrentBalance(userName) {
    const user = users.find(user => user.name === userName);
  
    if (user) {
      const transactions = user.transactions;
      const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'Receive' ? acc + transaction.amount : acc - transaction.amount;
      }, 0);
  
      return balance;
    } else {
      console.error(`User '${userName}' not found.`);
      return null;
    }
  }
  
// Test cases

// Test Case 1: Shrey receives 100
receiveMoney('Shrey', 100);
console.assert(getAllTransactions('Shrey').length === 1, 'Test Case 1 Failed. Transaction not recorded for Shrey');
console.assert(getCurrentBalance('Shrey') === 100, `Test Case 1 Failed. Expected balance 100, got ${getCurrentBalance('Shrey')}`);

// Test Case 2: Shrey spends 30 on groceries
spendMoney('Shrey', 30, 'Groceries');
console.assert(getAllTransactions('Shrey').length === 2, 'Test Case 2 Failed. Transaction not recorded for Shrey');
console.assert(getCurrentBalance('Shrey') === 70, `Test Case 2 Failed. Expected balance 70, got ${getCurrentBalance('Shrey')}`);

// Test Case 3: Ayush receives 50
receiveMoney('Ayush', 50);
console.assert(getAllTransactions('Ayush').length === 1, 'Test Case 3 Failed. Transaction not recorded for Ayush');
console.assert(getCurrentBalance('Ayush') === 50, `Test Case 3 Failed. Expected balance 50, got ${getCurrentBalance('Ayush')}`);

// Test Case 4: Ayush attempts to overspend
spendMoney('Ayush', 60, 'Overspending');
console.assert(getAllTransactions('Ayush').length === 1, 'Test Case 4 Failed. Unexpected transaction recorded for Ayush');
console.assert(getCurrentBalance('Ayush') === 50, `Test Case 4 Failed. Expected balance 50, got ${getCurrentBalance('Ayush')} (balance should not go below zero)`);

// Test Case 5: Shrey receives 200
receiveMoney('Shrey', 200);
console.assert(getAllTransactions('Shrey').length === 3, 'Test Case 5 Failed. Transaction not recorded for Shrey');
console.assert(getCurrentBalance('Shrey') === 270, `Test Case 5 Failed. Expected balance 270, got ${getCurrentBalance('Shrey')}`);

// Test Case 6: Ayush spends 20 on dinner
spendMoney('Ayush', 20, 'Dinner');
console.assert(getAllTransactions('Ayush').length === 2, 'Test Case 6 Failed. Transaction not recorded for Ayush');
console.assert(getCurrentBalance('Ayush') === 30, `Test Case 6 Failed. Expected balance 30, got ${getCurrentBalance('Ayush')}`);

// Test Case 7: Try to receive negative amount (should not record transaction)
receiveMoney('Shrey', -50);
console.assert(getAllTransactions('Shrey').length === 2, 'Test Case 7 Failed. Unexpected transaction recorded for Shrey');
console.assert(getCurrentBalance('Shrey') === 300, `Test Case 7 Failed. Expected balance 300, got ${getCurrentBalance('Shrey')} (no change)`);

// Test Case 8: Try to spend negative amount (should not record transaction)
spendMoney('Ayush', -20, 'InvalidExpense');
console.assert(getAllTransactions('Ayush').length === 2, 'Test Case 8 Failed. Unexpected transaction recorded for Ayush');
console.assert(getCurrentBalance('Ayush') === 30, `Test Case 8 Failed. Expected balance 30, got ${getCurrentBalance('Ayush')} (no change)`);

// Test Case 9: Try to get transactions for a non-existent user
console.assert(getAllTransactions('NonExistentUser').length === 0, 'Test Case 9 Failed. Unexpected transactions found for NonExistentUser');

// Test Case 10: Try to get balance for a non-existent user
console.assert(getCurrentBalance('NonExistentUser') === null, 'Test Case 10 Failed. Unexpected balance found for NonExistentUser');

// Test Case 11: Try to spend more than the current balance
spendMoney('Shrey', 400, 'Overspending');
console.assert(getAllTransactions('Shrey').length === 1, 'Test Case 11 Failed. Unexpected transaction recorded for Shrey');
console.assert(getCurrentBalance('Shrey') === 270, `Test Case 11 Failed. Expected balance 270, got ${getCurrentBalance('Shrey')} (balance should not go below zero)`);


