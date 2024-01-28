const fs = require('fs');
const path = require('path');

// Assuming your users.json file is in the data folder
const usersFilePath = path.join(__dirname, '../data/users.json');

// Function to read data from the file
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

// Function to write data to the file
const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2)); 
    console.log('Data written to file:', usersFilePath);
  } catch (error) {
    console.error('Error writing file:', error); 
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
