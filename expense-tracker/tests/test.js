const assert = require('assert');
const net = require('net');

const addMoney = require('../addMoney');
const spendMoney = require('../spendMoney');
const currentBalance = require('../currentBalance');
const showAllTransactions = require('../showAllTransactions');

// Create a simple mock server for testing
const mockServer = net.createServer();

// Test addMoney function
mockServer.on('connection', (socket) => {
  const testUserName = 'testUser';
  const testAmount = 100;

  socket.on('data', (data) => {
    const message = JSON.parse(data.toString().trim());
    assert.strictEqual(message.operation, 'addMoney');
    assert.deepStrictEqual(message.payload, { userName: testUserName, amount: testAmount });

    // Simulate the server response
    socket.write(JSON.stringify({ response: `Added money for user '${testUserName}'.` }));
  });

  // Perform the test
  addMoney(testUserName, testAmount);

  socket.end();
});

// Test currentBalance function
mockServer.on('connection', (socket) => {
  const testUserName = 'testUser';

  socket.on('data', (data) => {
    const message = JSON.parse(data.toString().trim());
    assert.strictEqual(message.operation, 'currentBalance');
    assert.deepStrictEqual(message.payload, { userName: testUserName });

    // Simulate the server response
    socket.write(JSON.stringify({ response: `Current balance for user '${testUserName}': 50` }));
  });

  // Perform the test
  const balance = currentBalance(testUserName);
  assert.strictEqual(balance, 50);

  socket.end();
});

// Test spendMoney function
mockServer.on('connection', (socket) => {
  const testSpendUserName = 'testUser';
  const testSpendAmount = 30;
  const testSpendPurpose = 'Test purpose';

  socket.on('data', (data) => {
    const message = JSON.parse(data.toString().trim());
    assert.strictEqual(message.operation, 'spendMoney');
    assert.deepStrictEqual(message.payload, {
      spendUserName: testSpendUserName,
      spendAmount: testSpendAmount,
      spendPurpose: testSpendPurpose
    });

    // Simulate the server response
    socket.write(JSON.stringify({ response: `Spent money for user '${testSpendUserName}'.` }));
  });

  // Perform the test
  spendMoney(testSpendUserName, testSpendAmount, testSpendPurpose);

  socket.end();
});

// Test showAllTransactions function
mockServer.on('connection', (socket) => {
  const testUserName = 'testUser';

  socket.on('data', (data) => {
    const message = JSON.parse(data.toString().trim());
    assert.strictEqual(message.operation, 'showAllTransactions');
    assert.deepStrictEqual(message.payload, { userName: testUserName });

    // Simulate the server response
    socket.write(
      JSON.stringify({
        response: `All transactions for user '${testUserName}': [{"amount": 20, "purpose": "Groceries"}]`
      })
    );
  });

  // Perform the test
  const transactions = showAllTransactions(testUserName);
  assert.deepStrictEqual(transactions, [{ amount: 20, purpose: 'Groceries' }]);

  socket.end();
});

// Start the mock server
const mockServerPort = 12345;
mockServer.listen(mockServerPort, () => {
  console.log(`Mock server listening on port ${mockServerPort}`);
});
