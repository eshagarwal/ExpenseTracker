const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`Received: ${message}`);
    socket.write(`Echo Uppercase: ${message.toUpperCase()}`);
    socket.write(`Echo Lowercase: ${message.toLowerCase()}`);
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
  console.log(`Echo server listening on port ${PORT}`);
});

// Export the server for testing purposes
module.exports = server;
