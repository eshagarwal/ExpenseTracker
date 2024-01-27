const readline = require("readline");
const net = require("net");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ host: 'localhost', port: 3000 }, () => {
  console.log('Connected to server');
  menu();
});

// Handle data received from the server
client.on('data', (data) => {
  const response = JSON.parse(data.toString().trim());
  console.log(`Server response: ${response.response}`);
  menu();
});

// Handle disconnection
client.on('end', () => {
  console.log('Disconnected from server');
  rl.close();
});

// Handle errors
client.on('error', (err) => {
  console.error(`Socket error: ${err.message}`);
  rl.close();
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
        client.end(); // Disconnect from the server
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
    rl.question("Enter amount to add: ", (amount) => {
      const addMoneyData = {
        operation: 'addMoney',
        payload: { userName, amount: parseFloat(amount) },
      };
      client.write(JSON.stringify(addMoneyData));
    });
  });
}

function spendMoneyOperation() {
  rl.question("Enter user name: ", (userName) => {
    rl.question("Enter amount to spend: ", (amount) => {
      rl.question("Enter purpose: ", (purpose) => {
        const spendMoneyData = {
          operation: 'spendMoney',
          payload: { spendUserName: userName, spendAmount: parseFloat(amount), spendPurpose: purpose },
        };
        client.write(JSON.stringify(spendMoneyData));
      });
    });
  });
}

function viewTransactionsOperation() {
  rl.question("Enter user name: ", (userName) => {
    const showTransactionsData = {
      operation: 'showAllTransactions',
      payload: { userName },
    };
    client.write(JSON.stringify(showTransactionsData));
  });
}

function checkBalanceOperation() {
  rl.question("Enter user name: ", (userName) => {
    const checkBalanceData = {
      operation: 'currentBalance',
      payload: { userName },
    };
    client.write(JSON.stringify(checkBalanceData));
  });
}

menu();
