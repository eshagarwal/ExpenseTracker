const readline = require("readline");
const addMoney = require("./addMoney");
const spendMoney = require("./spendMoney");
const showAllTransactions = require("./showAllTransactions");
const currentBalance = require("./currentBalance");
const users = require("./users");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log("\nMenu:");
  console.log("a) Add Money");
  console.log("b) Spend Money");
  console.log("c) View Transactions");
  console.log("d) Check Current Balance");
  console.log("e) Exit");

  rl.question("Choose an option (a/b/c/d/e): ", (answer) => {
    switch (answer.toLowerCase()) {
      case "a":
        addMoneyOperation();
        break;
      case "b":
        spendMoneyOperation();
        break;
      case "c":
        viewTransactionsOperation();
        break;
      case "d":
        checkBalanceOperation();
        break;
      case "e":
        rl.close();
        break;
      default:
        console.log("Invalid option. Please choose again.");
        menu();
        break;
    }
  });
}

function addMoneyOperation() {
  rl.question("Enter user name: ", (userName) => {
    const user = users.find((user) => user.name === userName);
    if (user) {
      rl.question("Enter amount to add: ", (amount) => {
        addMoney(userName, parseFloat(amount));
        console.log(`Amount added successfully for ${userName}`);
        menu();
      });
    } else {
      console.error(`User '${userName}' not found.`);
      menu();
    }
  });
}

function spendMoneyOperation() {
  rl.question("Enter user name: ", (userName) => {
    const user = users.find((user) => user.name === userName);
    if (user) {
      rl.question("Enter amount to spend: ", (amount) => {
        rl.question("Enter purpose: ", (purpose) => {
          spendMoney(userName, parseFloat(amount), purpose);
          console.log(`Amount spent successfully for ${userName}`);
          menu();
        });
      });
    } else {
      console.error(`User '${userName}' not found.`);
      menu();
    }
  });
}

function viewTransactionsOperation() {
  rl.question("Enter user name: ", (userName) => {
    const transactions = showAllTransactions(userName);
    console.log(`Transactions for ${userName}:`, transactions);
    menu();
  });
}

function checkBalanceOperation() {
  rl.question("Enter user name: ", (userName) => {
    const balance = currentBalance(userName);
    if (balance !== null) {
      console.log(`Current balance for ${userName}: ${balance}`);
    }
    menu();
  });
}

menu();
