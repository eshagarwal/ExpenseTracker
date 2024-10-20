const net = require('net');
const users = require('./users');
const addMoney = require('./addMoney');
const spendMoney = require('./spendMoney');
const currentBalance = require('./currentBalance');
const showAllTransactions = require('./showAllTransactions');

// Function to create a server instance
function createServer(port) {
  const server = net.createServer((socket) => {
    console.log(`Client connected to server on port ${port}`);

    socket.on('data', (data) => {
      const message = data.toString().trim();
      console.log(`Received on port ${port}: ${message}`);

      // Parse the message received from the client
      const parsedMessage = JSON.parse(message);

      // Function to send a response to the client
      function sendResponse(response) {
        socket.write(JSON.stringify({ response }));
      }

      // Check the type of operation requested by the client
      switch (parsedMessage.operation) {
        case 'addMoney':
          const { userName, amount } = parsedMessage.payload;
          addMoney(userName, amount);
          sendResponse(`Added money for user '${userName}'.`);
          break;
        case 'currentBalance':
          const balance = currentBalance(parsedMessage.payload.userName);
          sendResponse(`Current balance for user '${parsedMessage.payload.userName}': ${balance}`);
          break;
        case 'spendMoney':
          const { spendUserName, spendAmount, spendPurpose } = parsedMessage.payload;
          spendMoney(spendUserName, spendAmount, spendPurpose);
          sendResponse(`Spent money for user '${spendUserName}'.`);
          break;
        case 'showAllTransactions':
          const allTransactions = showAllTransactions(parsedMessage.payload.userName);
          sendResponse(`All transactions for user '${parsedMessage.payload.userName}': ${JSON.stringify(allTransactions)}`);
          break;
        default:
          sendResponse('Invalid operation requested by the client.');
      }
    });

    socket.on('error', (err) => {
      console.error(`Socket error on port ${port}: ${err.message}`);
    });
  });

  return server;
}

// Create server instances for both ports
const server1 = createServer(3000);
const server2 = createServer(8000);

// Start listening on both ports
server1.listen(3000, () => {
  console.log('Server 1 listening on port 3000');
});

server2.listen(8000, () => {
  console.log('Server 2 listening on port 8000');
});

// Test case: Check if both ports are up
const checkPortClient1 = new net.Socket();
checkPortClient1.setTimeout(1000);

const checkPortClient2 = new net.Socket();
checkPortClient2.setTimeout(1000);

checkPortClient1.on('connect', () => {
  console.log('Port 3000 is up');
  checkPortClient1.end();
});

checkPortClient1.on('error', (err) => {
  console.error(`Error connecting to port 3000: ${err.message}`);
});

checkPortClient1.on('timeout', () => {
  console.error('Connection timeout on port 3000');
});

checkPortClient1.connect(3000, 'localhost');

checkPortClient2.on('connect', () => {
  console.log('Port 8000 is up');
  checkPortClient2.end();
});

checkPortClient2.on('error', (err) => {
  console.error(`Error connecting to port 8000: ${err.message}`);
});

checkPortClient2.on('timeout', () => {
  console.error('Connection timeout on port 8000');
});

checkPortClient2.connect(8000, 'localhost');

// Automatically close one server after 10 seconds
setTimeout(() => {
  console.log('Server 1 closed after 10 seconds');
  server1.close();
}, 10000);
