import { Bank } from "./Bank.js";
import { Client } from "./Client.js";

export class BankAccount {
    client;
    bank;
    accountNumber;
    agencyNumber;
    #balance = 0

    constructor(client, bank, accountNumber,agencyNumber) {
        this.client = client;
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.agencyNumber =agencyNumber;
        
}

 get balance() {
        console.log(`Saldo da conta ${this.accountNumber}: ${this.#balance}`);
        return this.#balance;
    }

    set balance(newBalance) {
        console.log(`Saldo da conta ${this.accountNumber} atualizado para ${newBalance}`);
        this.#balance = newBalance;
    }

    
    creditAmount(amount) {
        this.#balance += amount;
        console.log(`Crédito de ${amount} na conta ${this.accountNumber}`);
    }

    debitAmount(amount) {
        if (amount <= this.#balance) {
            this.#balance -= amount;
            console.log(`Débito de ${amount} na conta ${this.accountNumber}`);
        } else {
            console.log(`Saldo insuficiente para efetuar o débito na conta ${this.accountNumber}`);
        }
    }

    transferTo(anotherAccount, amount) {
        if (amount <= this.#balance) {
            this.#balance -= amount;
            anotherAccount.creditAmount(amount);
            console.log(`Transferência de ${amount} da conta ${this.accountNumber} para a conta ${anotherAccount.accountNumber}`);
        } else {
            console.log(`Saldo insuficiente para efetuar a transferência da conta ${this.accountNumber}`);
        }
    }

    closeAccount() {
        this.#balance = 0;
        console.log(`Conta ${this.accountNumber} fechada`);
    }

    //cashWithdrawal(amount)
    cashWithdrawal(amount) {
        if (amount <= this.#balance) {
            this.#balance -= amount;
            console.log(`Retirada de ${amount} da conta ${this.accountNumber} em um banco 24 horas`);
        } else {
            console.log(`Saldo insuficiente para efetuar a retirada na conta ${this.accountNumber}`);
        }
    }
}
