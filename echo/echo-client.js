const net = require('net');

// Create a socket and connect to the server
const socket = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server');

  // Send data to the server
  socket.write('Hello, server!');

  // Event listener for data received from the server
  socket.on('data', (data) => {
    console.log(`Received from server: ${data}`);
  });

  // Event listener for server disconnect
  socket.on('end', () => {
    console.log('Disconnected from server');
  });
});

// Event listener for errors
socket.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
