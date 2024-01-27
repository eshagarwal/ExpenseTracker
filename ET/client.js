const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();

const PORT = 3000;
const HOST = 'localhost';

client.connect(PORT, HOST, () => {
  console.log('Connected to server');
  const menu = require('./menu').menu; // Import menu function here
  menu(); // Start the menu
});

// Event handler for data received from the server
client.on('data', (data) => {
  const responseData = JSON.parse(data.toString());
  console.log(responseData.message || responseData.transactions || responseData.balance);
});

// Event handler for connection close
client.on('close', () => {
  console.log('Connection closed');
  rl.close();
});

function sender(operation, data) {
    client.write(JSON.stringify({ operation, data }));
  }
  

// Client-side operation functions

function addMoneyOperation(users) {
    rl.question('Enter user name: ', (userName) => {
      const user = 
      users.find((user) => user.name === userName);
      if (user) {
        rl.question('Enter amount to add: ', (amount) => {
            sender('addMoney', { userName, amount: parseFloat(amount) });
        });
      } else {
        console.error(`User '${userName}' not found.`);
        menu();
      }
    });
  }
  

function spendMoneyOperation(users) {
  rl.question('Enter user name: ', (userName) => {
    const user = users.find((user) => user.name === userName);
    if (user) {
      rl.question('Enter amount to spend: ', (amount) => {
        rl.question('Enter purpose: ', (purpose) => {
            sender('spendMoney', { userName, amount: parseFloat(amount), purpose });
        });
      });
    } else {
      console.error(`User '${userName}' not found.`);
    }
  });
}

function viewTransactionsOperation(users) {
  rl.question('Enter user name: ', (userName) => {
    sender('showAllTransactions', { userName });
  });
}

function checkBalanceOperation(users) {
  rl.question('Enter user name: ', (userName) => {
    sender('currentBalance', { userName });
  });
}

module.exports = {
  addMoneyOperation,
  spendMoneyOperation,
  viewTransactionsOperation,
  checkBalanceOperation,
};
