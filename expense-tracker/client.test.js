const assert = require('assert');
const { sendRequest, startMenu } = require('./menu-as-client');

// Mocking readline and client
const mockReadline = {
  question: (question, callback) => {
    if (question.includes('Enter user name')) {
      callback('testUser');
    } else if (question.includes('Enter amount')) {
      callback('50');
    } else if (question.includes('Enter purpose')) {
      callback('Groceries');
    } else {
      callback('1');
    }
  },
  close: () => {},
};

const mockClient = {
  write: (message) => {
    const parsedMessage = JSON.parse(message);
    assert.strictEqual(parsedMessage.operation, 'addMoney');
    assert.deepStrictEqual(parsedMessage.payload, { userName: 'testUser', amount: 50 });
  },
};

// Test sendRequest function
sendRequest('addMoney', { userName: 'testUser', amount: 50 });

// Test startMenu function
startMenu.call({ rl: mockReadline, client: mockClient });

console.log('Tests passed successfully!');
