// echo-client.js

const net = require('net');

const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to echo server');

  // Send a message to the server
  const message = 'Hello, Echo Server!';
  console.log(`Sending: ${message}`);
  client.write(message);
});

client.on('data', (data) => {
  const response = data.toString().trim();
  console.log(`Server response: ${response}`);
  client.end(); // Close the connection after receiving the response
});

client.on('end', () => {
  console.log('Connection closed by the server');
});

client.on('error', (err) => {
  console.error(`Client error: ${err.message}`);
});
