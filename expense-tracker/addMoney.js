const usersModule = require('./users'); 
const { readDataFromFile, writeDataToFile } = usersModule;

// Function to add money received
function addMoney(userName, amount) {
  let users = readDataFromFile();

  const user = users.find((user) => user.name === userName);

  if (user) {
    const date = new Date();
    user.transactions.push({ type: 'Receive', date, amount });

    // Log relevant information for testing
    console.log(`Added ${amount} to ${userName}'s account.`);
    console.log('Updated user data:', user);

    // Write the updated data back to the file
    writeDataToFile(users);
  } else {
    console.error(`User '${userName}' not found.`);
  }
}

module.exports = addMoney;
