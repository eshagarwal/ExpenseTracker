const assert = require('assert');
const net = require('net');

const PORT = 3000;

// Function to check if the server is running
function checkServerRunning(callback) {
  const client = net.createConnection({ port: PORT }, () => {
    client.end();
    callback(true);
  });

  client.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
      callback(false);
    } else {
      callback(true);
    }
  });
}

// Run the test
checkServerRunning((isRunning) => {
  if (isRunning) {
    console.log('Server is running successfully.');
  } else {
    console.error('Error: Server is not running or unable to connect.');
  }
});
