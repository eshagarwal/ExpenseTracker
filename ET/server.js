const net = require('net');
const users = require('./users');

const server = net.createServer((socket) => {
  console.log('Client connected');

  // Event handler for data received from the client
  socket.on('data', (data) => {
    const requestData = JSON.parse(data.toString());

    switch (requestData.operation) {
      case 'addMoney':
        addMoneyOperation(requestData, (response) => {
          socket.write(JSON.stringify(response));
        });
        break;
      case 'spendMoney':
        spendMoneyOperation(requestData, (response) => {
          socket.write(JSON.stringify(response));
        });
        break;
      case 'showAllTransactions':
        showAllTransactionsOperation(requestData, (response) => {
          socket.write(JSON.stringify(response));
        });
        break;
      case 'currentBalance':
        currentBalanceOperation(requestData, (response) => {
          socket.write(JSON.stringify(response));
        });
        break;
      default:
        console.log('Invalid operation received');
    }
  });

  // Event handler for client disconnect
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Listen on a specific port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Function to add money received
function addMoneyOperation(requestData, callback) {
  const { userName, amount } = requestData;
  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    user.transactions.push({ type: 'Receive', date, amount });
    callback({ success: true, message: `Amount added successfully for ${userName}` });
  } else {
    callback({ success: false, message: `User '${userName}' not found.` });
  }
}

// Function to add money spent
function spendMoneyOperation(requestData, callback) {
  const { userName, amount, purpose } = requestData;
  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    user.transactions.push({ type: 'Spend', date, amount, purpose });
    callback({ success: true, message: `Spent money for user '${userName}'.` });
  } else {
    callback({ success: false, message: `User '${userName}' not found.` });
  }
}

// Function to show the list of all transactions
function showAllTransactionsOperation(requestData, callback) {
  const { userName } = requestData;
  const user = users.find((user) => user.name === userName);

  if (user) {
    const transactions = user.transactions;
    callback({ success: true, transactions });
  } else {
    callback({ success: false, message: `User '${userName}' not found.` });
  }
}

// Function to get the current balance
function currentBalanceOperation(requestData, callback) {
  const { userName } = requestData;
  const user = users.find((user) => user.name === userName);

  if (user) {
    const transactions = user.transactions;
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'Receive' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    callback({ success: true, balance });
  } else {
    callback({ success: false, message: `User '${userName}' not found.` });
  }
}
