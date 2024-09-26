import { BankAccount } from './BankAccount.js';


export class CurrentAccount extends BankAccount {
    constructor(client, bank, accountNumber, agencyNumber) {
        super(client, bank, accountNumber, agencyNumber);
    }

    transferTo(anotherAccount, amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            anotherAccount.creditAmount(amount);
            console.log(`Transferência de ${amount} da conta ${this.accountNumber} para a conta ${anotherAccount.accountNumber}`);
        } else {
            console.log(`Saldo insuficiente para efetuar a transferência da conta ${this.accountNumber}`);
        }
    }
}