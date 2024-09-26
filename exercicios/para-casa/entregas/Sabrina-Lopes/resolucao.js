// Importações
import { Bank } from './Bank.js';
import { BankAccount } from './BankAccount.js';
import { Client } from './Client.js';
import { SavingAccount } from './SavingAccount.js';
import { CurrentAccount } from './CurrentAccount.js';

// instâncias de Bank
const bank1 = new Bank("B001", "Bank A", 0.05);
const bank2 = new Bank("B002", "Bank B", 0.1);

// instâncias de Client
const client1 = new Client("Alice", "132330");
const client2 = new Client("Bob", "142720");

// instâncias de BankAccount, CurrentAccount e SavingAccount
const account1 = new BankAccount(client1, bank1, "ACC001", "AG001");
const account2 = new CurrentAccount(client1, bank1, "ACC002", "AG001");
const account3 = new SavingAccount(client2, bank2, "ACC003", "AG002", 0.02, 15);

//  operações nas contas
account1.creditAmount(1000);
account1.balance; // Deve exibir o saldo da conta
account1.debitAmount(500);
account1.balance; // Deve exibir o novo saldo da conta
account1.transferTo(account2, 200);
account1.balance; // Deve exibir o saldo atualizado
account2.balance; // Deve exibir o saldo atualizado

// operações em uma conta de poupança
account3.creditAmount(10000);
account3.balance; // Deve exibir o saldo da conta
account3.generateIncome(15); // Atualiza o saldo com o rendimento
account3.balance; // Deve exibir o novo saldo após o rendimento

// operações de retirada em uma conta de poupança
account3.cashWithdrawal(1000); // Retirada gratuita
account3.cashWithdrawal(1000); // Retirada gratuita
account3.cashWithdrawal(1000); // Retirada com taxa aplicada
account3.cashWithdrawal(1000); // Retirada com taxa aplicada
