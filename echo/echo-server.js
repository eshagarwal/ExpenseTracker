const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  // Set encoding to utf-8 to handle string data
  socket.setEncoding('utf-8');

  // Event listener for data received from the client
  socket.on('data', (data) => {
    console.log(`Received from client: ${data}`);
    
    // Echo the received data back to the client
    socket.write(`Server echoing: ${data}`);
  });

  // Event listener for client disconnect
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Set the server to listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
