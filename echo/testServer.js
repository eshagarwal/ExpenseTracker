// const assert = require('assert');
import { createConnection } from 'net';

const PORT = 3000;

// Function to check if the server is running
function checkServerRunning(callback) {
  const client = createConnection({ port: PORT }, () => {
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

// Function to check if the server responds with the message in uppercase or lowercase
function checkServerResponse(callback) {
  const client = createConnection({ port: PORT }, () => {
    // Send a message to the server
    client.write('HELLO');
  });

  let receivedData = '';

  client.on('data', (data) => {
    receivedData += data;
    // Close the connection after receiving the response
    client.end();
  });

  client.on('end', () => {
    // Check if the received data is in uppercase or lowercase
    const isUpperCase = receivedData === receivedData.toUpperCase();
    const isLowerCase = receivedData === receivedData.toLowerCase();
    
    callback(isUpperCase, isLowerCase);
  });

  client.on('error', () => {
    callback(false, false);
  });
}

// Run the tests
checkServerRunning((isRunning) => {
  if (isRunning) {
    console.log('Server is running successfully.');
  } else {
    console.error('Error: Server is not running or unable to connect.');
  }
});

checkServerResponse((isUpperCase, isLowerCase) => {
  if (isUpperCase) {
    console.log('Server response is in uppercase.');
  } else {
    console.error('Error: Server response is not in uppercase or unable to connect.');
  }

  if (isLowerCase) {
    console.log('Server response is in lowercase.');
  } else {
    console.error('Error: Server response is not in lowercase or unable to connect.');
  }
});
