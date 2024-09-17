// Importações
const { Bank } = require("./Bank");
const { Client } = require("./Client");
const { BankAccount } = require("./BankAccount");
const { SavingAccount } = require("./SavingAccount");
const { CurrentAccount } = require("./CurrentAccount");

// Criação de bancos
const bank1 = new Bank(100, "Lua Bank", 0.01);
const bank2 = new Bank(200, "Code Bank", 0.02);

// Criação de clientes
const client1 = new Client("Luara", 123456789);
const client2 = new Client("Simone", 987654321);
const client3 = new Client("Ada", 987654321);

// Associando clientes a bancos
client1.addBank(bank1); // Banco 100 adicionado à cliente Luara.
client1.addBank(bank1); // Cliente do CPF 123456789 já possui conta no banco Lua Bank.
client1.addBank(bank2); // Banco 200 adicionado à cliente Luara.
client1.removeBank(bank2); // Banco 200 removido da cliente Luara
client1.removeBank(bank2); // Cliente do CPF 123456789 não possui conta no banco Code Bank para ser removida.

client2.addBank(bank1); // Banco 100 adicionado à cliente Simone.
client2.addBank(bank2); // Banco 200 adicionado à cliente Simone.

client3.addBank(bank1); // Banco 100 adicionado à cliente Ada.
client3.addBank(bank2); // Banco 200 adicionado à cliente Ada.

client3.addBank("Banco que não existe"); // Informe um banco válido.

// Conferindo bancos
console.log(Bank.createdBanks); // [ { bankCode: 100, qtdClients: 3 }, { bankCode: 200, qtdClients: 2 } ]

console.log(bank1);
console.log(bank2);

/*
Exemplo do que será impresso:
Bank { bankCode: 100, bankName: 'Lua Bank' }
*/

// Conferindo clientes
console.log(client1);
console.log(client2);
console.log(client3);

/*
Client {
  name: 'Ada',
  banks: [
    Bank { bankCode: 100, bankName: 'Lua Bank' },
    Bank { bankCode: 200, bankName: 'Code Bank' }
  ]
}
*/

// Criação de conta
const bankAccount1 = new BankAccount(client1, bank1, 1111, 2222);
const bankAccount2 = new BankAccount(client2, bank2, 3333, 4444);

// Utilizando os métodos de Conta Corrente
bankAccount1.creditAmount(5000); // O novo saldo da conta após o crédito é: R$ 5000,00
bankAccount2.creditAmount(2000); // O novo saldo da conta após o crédito é: R$ 2000,00

// Transferência entre bancos diferentes
bankAccount1.transferTo(bankAccount2, 1500);
bankAccount2.transferTo(bankAccount1, 5000);

/** Exemplo de saídas:
  Essa transferência terá uma taxa de 1%, pois se trata de uma transferência entre bancos diferentes.
  O saldo atual da conta de origem é de R$ 3485
  O saldo atual da conta de destino é de R$ 3500

  ---

  Essa transferência terá uma taxa de 2%, pois se trata de uma transferência entre bancos diferentes.
  Saldo insuficiente para realizar a transferência. Seu saldo atual é de 3500.
  Para realizar essa transferência você precisa ter 5100 em conta.
*/

bankAccount1.cashWithdrawal(50);
bankAccount1.cashWithdrawal(3535);

const currentAccount1 = new CurrentAccount(client1, bank1, 1111, 2222);
const currentAccount2 = new CurrentAccount(client2, bank2, 3333, 4444);

currentAccount1.creditAmount(5000);
currentAccount2.creditAmount(2000);

currentAccount1.transferTo(currentAccount2, 1500);
currentAccount2.transferTo(currentAccount1, 5000);

const savingAccount1 = new SavingAccount(client2, bank1, 5555, 6666, 0.1, 20);
const savingAccount2 = new SavingAccount(client3, bank2, 7777, 8888, 0.05, 5);

savingAccount1.creditAmount(1300);
savingAccount1.debitAmount(300);
savingAccount1.generateIncome(20);

savingAccount2.creditAmount(1000);
savingAccount2.cashWithdrawal(100);
savingAccount2.cashWithdrawal(500);
savingAccount2.cashWithdrawal(200);
savingAccount2.cashWithdrawal(300);
