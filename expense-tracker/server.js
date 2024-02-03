const net = require('net');
const users = require('./users');
const addMoney = require('./addMoney');
const spendMoney = require('./spendMoney');
const currentBalance = require('./currentBalance');
const showAllTransactions = require('./showAllTransactions');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`Received: ${message}`);

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

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  // Test case: Check if the port is up
  const checkPortClient = new net.Socket();
  checkPortClient.setTimeout(1000); // Set a timeout for the connection attempt

  checkPortClient.on('connect', () => {
    console.log('Port is up');
    checkPortClient.end();
  });

  checkPortClient.on('error', (err) => {
    console.error(`Error connecting to port: ${err.message}`);
    assert.fail('Port should be up, but got an error');
  });

  checkPortClient.on('timeout', () => {
    console.error('Connection timeout');
    assert.fail('Port should be up, but connection timed out');
  });

  checkPortClient.connect(PORT, 'localhost');
});

// Close the server after the check
// setTimeout(() => {
//   server.close();
// }, 2000);


