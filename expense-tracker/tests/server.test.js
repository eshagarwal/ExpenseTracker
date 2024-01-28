const assert = require('assert');
const net = require('net');

// Mocking addMoney, currentBalance, spendMoney, showAllTransactions functions
const { addMoney, currentBalance, spendMoney, showAllTransactions } = require('../server');

// Mocking server
const mockServer = net.createServer((socket) => {
  socket.on('data', (data) => {
    const message = JSON.parse(data.toString().trim());
    switch (message.operation) {
      case 'addMoney':
        addMoney(message.payload.userName, message.payload.amount);
        socket.write(JSON.stringify({ response: 'Mocked addMoney response' }));
        break;
      case 'currentBalance':
        const balance = currentBalance(message.payload.userName);
        socket.write(JSON.stringify({ response: `Mocked currentBalance response: ${balance}` }));
        break;
      case 'spendMoney':
        spendMoney(message.payload.spendUserName, message.payload.spendAmount, message.payload.spendPurpose);
        socket.write(JSON.stringify({ response: 'Mocked spendMoney response' }));
        break;
      case 'showAllTransactions':
        const transactions = showAllTransactions(message.payload.userName);
        socket.write(JSON.stringify({ response: `Mocked showAllTransactions response: ${JSON.stringify(transactions)}` }));
        break;
      default:
        socket.write(JSON.stringify({ response: 'Invalid operation requested by the client.' }));
    }
  });
});

// Test addMoney function
mockServer.on('connection', (socket) => {
  socket.write(JSON.stringify({ operation: 'addMoney', payload: { userName: 'testUser', amount: 50 } }));
});

// Test currentBalance function
mockServer.on('connection', (socket) => {
  socket.write(JSON.stringify({ operation: 'currentBalance', payload: { userName: 'testUser' } }));
});

// Test spendMoney function
mockServer.on('connection', (socket) => {
  socket.write(JSON.stringify({ operation: 'spendMoney', payload: { spendUserName: 'testUser', spendAmount: 20, spendPurpose: 'Groceries' } }));
});

// Test showAllTransactions function
mockServer.on('connection', (socket) => {
  socket.write(JSON.stringify({ operation: 'showAllTransactions', payload: { userName: 'testUser' } }));
});

// Start the mock server
const mockServerPort = 12345;
mockServer.listen(mockServerPort, () => {
  console.log(`Mock server listening on port ${mockServerPort}`);
});
