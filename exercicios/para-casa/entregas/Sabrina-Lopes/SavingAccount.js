import { BankAccount } from './BankAccount.js';

export class SavingAccount extends BankAccount {
    incomeRate;
    incomeDay;
    #qtdWithdrawal = 0;
    #MAX_OF_WITHDRAWAL = 2;
    #withdrawalTax = 0.03;

    constructor(client, bank, accountNumber, agencyNumber, incomeRate, incomeDay) {
        super(client, bank, accountNumber, agencyNumber);
        this.incomeRate = incomeRate;
        this.incomeDay = incomeDay;
    }

    get qtdWithdrawal() {
        return this.#qtdWithdrawal;
    }

    get withdrawalTax() {
        return this.#withdrawalTax;
    }

    set withdrawalTax(newTax) {
        this.#withdrawalTax = newTax;
    }

    cashWithdrawal(amount) {
        console.log(`Conta ${this.accountNumber}: Quantidade de retiradas feitas até o momento: ${this.qtdWithdrawal} de um máximo de ${this.#MAX_OF_WITHDRAWAL}`);
        
        if (this.#qtdWithdrawal < this.#MAX_OF_WITHDRAWAL) {
            if (amount <= this.balance) {
                this.balance -= amount;
                this.#qtdWithdrawal++;
                console.log(`Retirada de ${amount} da conta ${this.accountNumber} em um banco 24 horas. Retirada gratuita.`);
            } else {
                console.log(`Saldo insuficiente para efetuar a retirada na conta ${this.accountNumber}`);
            }
        } else {
            if (amount <= this.balance) {
                this.balance -= amount;
                this.#qtdWithdrawal++;
                const withdrawalFee = amount * this.#withdrawalTax;
                console.log(`Retirada de ${amount} da conta ${this.accountNumber} em um banco 24 horas. Taxa de retirada: ${withdrawalFee}`);
            } else {
                console.log(`Saldo insuficiente para efetuar a retirada na conta ${this.accountNumber}`);
            }
        }

        console.log(`Saldo da conta ${this.accountNumber}: ${this.balance}`);
        console.log(`Conta ${this.accountNumber}: Quantidade de retiradas feitas até o momento: ${this.qtdWithdrawal} de um máximo de ${this.#MAX_OF_WITHDRAWAL}`);
    }

    generateIncome(currentDay) {
        if (currentDay === this.incomeDay) {
            const income = this.balance * this.incomeRate;
            this.balance += income;
            console.log(`Rendimento de ${income} aplicado na conta ${this.accountNumber}`);
        }
        console.log(`Saldo da conta ${this.accountNumber}: ${this.balance}`);
    }
}