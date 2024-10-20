const readline = require('readline');
const net = require('net');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentServer;

// Function to create a client connection
function createClient(port, onConnect, onData, onEnd, onError) {
  const client = net.createConnection({ port }, () => {
    console.log(`Connected to server on port ${port}`);
    // onConnect();
    startMenu();
  });

  client.on('data', (data) => {
    console.log(`Server response on port ${port}: ${data}`);
    onData(data);
  });

  client.on('end', () => {
    console.log(`Connection closed by the server on port ${port}`);
    // onEnd();
    startMenu();
  });

  client.on('error', (err) => {
    console.error(`Client error on port ${port}: ${err.message}`);
    onError(err);
  });

  return client;
}

// Function to send a request to the server
function sendRequest(operation, payload) {
  const message = JSON.stringify({ operation, payload });
  console.log(`Sending on port ${currentServer.remotePort}: ${message}`);
  currentServer.write(message);
}

// Function to start the menu
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

// Create a client connection to server 1
currentServer = createClient(3000, switchServer, handleData, handleEnd, handleError);

// Exporting the sendRequest function for testing
module.exports = { sendRequest };

function switchServer() {
  // Switch to the other server
  currentServer.end(); // Close the current connection

  // Create a new client connection to server 2
  currentServer = createClient(8000, switchServer, handleData, handleEnd, handleError);
}

function handleData(data) {
  // Handle data received from the server
  // ...
}

function handleEnd() {
  // Handle the end event (connection closed by the server)
  // ...
}

function handleError(err) {
  // Handle errors from the server
  // ...
}

// Start the initial connection
startMenu();
