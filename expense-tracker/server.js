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
      if (!socket.destroyed) {
        socket.write(JSON.stringify({ response }));
      }
    }

    // Check the type of operation requested by the client
    switch (parsedMessage.operation) {
      case 'addMoney':
        const { userName, amount } = parsedMessage.payload;
        addMoney(userName, amount, (result) => {
          console.log(result);
          sendResponse(result);
        });
        break;
      case 'currentBalance':
        currentBalance(parsedMessage.payload.userName, (result) => {
          console.log(result);
          sendResponse(result);
        });
        break;
      case 'spendMoney':
        const { spendUserName, spendAmount, spendPurpose } = parsedMessage.payload;
        spendMoney(spendUserName, spendAmount, spendPurpose, (result) => {
          console.log(result);
          sendResponse(result);
        });
        break;
      case 'showAllTransactions':
        showAllTransactions(parsedMessage.payload.userName, (result) => {
          console.log(result);
          sendResponse(result);
        });
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
});
