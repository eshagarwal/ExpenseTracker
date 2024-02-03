const readline = require('readline');
const net = require('net');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server');
  startMenu();
});

client.on('data', (data) => {
  console.log(`Server response: ${data}`);
  startMenu();
});

client.on('end', () => {
  console.log('Connection closed by the server');
  rl.close();
});

client.on('error', (err) => {
  console.error(`Client error: ${err.message}`);
  rl.close(); // Close readline interface on error
});

// Function to send a request to the server
function sendRequest(operation, payload) {
  const message = JSON.stringify({ operation, payload });
  console.log(`Sending: ${message}`);
  client.write(message);
}

function startMenu() {
  console.log('\nMenu:');
  console.log('1. Add Money');
  console.log('2. Current Balance');
  console.log('3. Spend Money');
  console.log('4. Show All Transactions');
  console.log('5. Exit');

  rl.question('Enter your choice (1-5): ', (choice) => {
    switch (choice) {
      case '1':
        rl.question('Enter user name: ', (userName) => {
          rl.question('Enter amount: ', (amount) => {
            sendRequest('addMoney', { userName, amount: parseInt(amount) });
          });
        });
        break;
      case '2':
        rl.question('Enter user name: ', (userName) => {
          sendRequest('currentBalance', { userName });
        });
        break;
      case '3':
        rl.question('Enter user name: ', (spendUserName) => {
          rl.question('Enter amount: ', (spendAmount) => {
            rl.question('Enter purpose: ', (spendPurpose) => {
              sendRequest('spendMoney', { spendUserName, spendAmount: parseInt(spendAmount), spendPurpose });
            });
          });
        });
        break;
      case '4':
        rl.question('Enter user name: ', (userName) => {
          sendRequest('showAllTransactions', { userName });
        });
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 5.');
    }
  });
}

// Handle readline close event
rl.on('close', () => {
  console.log('Exiting...');
  client.end(); // Close the connection when readline interface is closed
});

// Exporting the sendRequest function for testing
module.exports = { sendRequest };


const PORT = 3000;

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