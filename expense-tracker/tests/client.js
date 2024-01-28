const net = require('net');

// Function to send an addMoney request to the server
function addMoney(userName, amount) {
  const client = net.createConnection({ port: 3000 }, () => {
    const message = JSON.stringify({
      operation: 'addMoney',
      payload: { userName, amount },
    });
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
}

module.exports = addMoney;
