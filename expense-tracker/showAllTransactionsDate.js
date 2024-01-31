const fs = require("fs");
const path = require("path");
const users = require("./users");

// Function to show the list of transactions for a specific user within a date range
function showAllTransactionsDate(userName, startDate, endDate) {
  const user = users.find((user) => user.name === userName);

  if (!user) {
    console.error(`User '${userName}' not found.`);
    return [];
  }

  const transactionFiles = getTransactionFiles(userName);

  return transactionFiles
    .map((file) => {
      const filePath = path.join(__dirname, `../data/transactions/${file}`);
      const transactionData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(transactionData);
    })
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const startRangeDate = new Date(startDate);
      const endRangeDate = new Date(endDate);
      return transactionDate >= startRangeDate && transactionDate <= endRangeDate;
    });
}

function getTransactionFiles(userName) {
  const transactionPath = path.join(__dirname, `../data/transactions`);
  try {
    const files = fs.readdirSync(transactionPath);
    // console.log("Transaction Files:", files);

    return files.filter((file) => {
      const filePath = path.join(transactionPath, file);
      const transactionData = fs.readFileSync(filePath, "utf-8");
      const parsedTransaction = JSON.parse(transactionData);
      
      return parsedTransaction.userName === userName;
    });
  } catch (error) {
    console.error("Error reading transaction files:", error);
    return [];
  }
}

module.exports = showAllTransactionsDate;

const transactionsForAyush = showAllTransactionsDate("Ayush", "2024-01-28T00:00:00.000Z", "2024-01-31T23:59:59.999Z");
console.log(transactionsForAyush);

const transactionsForShrey = showAllTransactionsDate("Shrey", "2024-01-28T10:06:15.309Z", "2024-01-31T23:59:59.999Z");
console.log(transactionsForShrey);
