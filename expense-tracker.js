// Expense Tracker
const users = [
    { name: 'Shrey', transactions: [] },
    { name: 'Ayush', transactions: [] },
    { name: 'Alfiya', transactions: [] },
    { name: 'Sam', transactions: [] }
  ];
  
  // Function to add money received
  function receiveMoney(userIndex, amount) {
    const date = new Date();
    users[userIndex].transactions.push({ type: 'Receive', date, amount });
  }
  
  // Function to add money spent
  function spendMoney(userIndex, amount, purpose) {
    const date = new Date();
    users[userIndex].transactions.push({ type: 'Spend', date, amount, purpose });
  }
  
  // Function to get the list of all transactions
  function getAllTransactions(userIndex) {
    return users[userIndex].transactions;
  }
  
  // Function to get the current balance
  function getCurrentBalance(userIndex) {
    const transactions = users[userIndex].transactions;

    //The reduce method is used to iterate over the transactions array and calculate the final balance. 
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'Receive' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
  
    return balance;
  }
  
  // Test cases
  receiveMoney(0, 100); // User1 receives 100
  spendMoney(0, 30, 'Groceries'); // User1 spends 30 on groceries
  receiveMoney(1, 50); // User2 receives 50
  spendMoney(1, 20, 'Dinner'); // User2 spends 20 on dinner
  
  console.log(getAllTransactions(0)); // Get all transactions for User1
  console.log("Current balance of Shrey :" + getCurrentBalance(0)); // Get current balance for User1
  console.log(getAllTransactions(1)); // Get all transactions for User2
  console.log("Current balance of Ayush :" + getCurrentBalance(1)); // Get current balance for User2
  