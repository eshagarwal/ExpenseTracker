const readline = require('readline');
const client = require('./client');
const users = require('./users');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log('\nMenu:');
  console.log('a) Add Money');
  console.log('b) Spend Money');
  console.log('c) View Transactions');
  console.log('d) Check Current Balance');
  console.log('e) Exit');

  rl.question('Choose an option (a/b/c/d/e): ', (answer) => {
    switch (answer.toLowerCase()) {
      case 'a':
        client.addMoneyOperation(users);
        break;
      case 'b':
        client.spendMoneyOperation(users);
        break;
      case 'c':
        client.viewTransactionsOperation(users);
        break;
      case 'd':
        client.checkBalanceOperation(users);
        break;
      case 'e':
        rl.close();
        client.destroy(); // Close the client connection
        break;
      default:
        console.log('Invalid option. Please choose again.');
        menu();
        break;
    }
  });
}

module.exports = { menu };
