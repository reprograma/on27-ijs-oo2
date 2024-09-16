import { Bank, bank1, bank2 } from "./Bank.js"
import { Client, client1 } from "./Client.js"

class BankAccount {
  client;
  bank;
  accountNumber;
  agencyNumber;
  #balance = 0;

  constructor(client, bank, accountNumber, agencyNumber) {
    if (!(client instanceof Client)) {
      throw "A pessoa cliente deve estar registrada no cadastro de clientes!";
    }

    if (!(bank instanceof Bank)) {
      throw "O banco deve estar registrado no cadastro de bancos!";
    }

    this.client = client;
    this.bank = bank;
    this.accountNumber = accountNumber;
    this.agencyNumber = agencyNumber;
  }

  get balance() {
    return this.#balance;
  }

  set balance(newBalance) {
    this.#balance = newBalance;
  }

  creditAmount(amount) {
    this.#balance += amount;
  }

  debitAmount(amount) {
    if (this.#balance < amount) {
      throw new Error("Não há crédito suficiente em sua conta!");
    }
    this.#balance -= amount;
  }

  transferTo(anotherAccount, amount) {
    if (!(anotherAccount instanceof BankAccount)) {
      throw new Error("Essa conta não existe!");
    }
    if (this.bank === anotherAccount.bank) {
      if (this.#balance < amount) {
        throw `Saldo insuficiente! Você precisa de ${amount} para realizar essa transação!`;
      }
      this.#balance -= amount;
      anotherAccount.#balance += amount;
      console.log(
        `Seu total agora é ${this.#balance} e você transferiu ${amount}.`
      );
    } else {
      const bankName = this.bank;
      const totalDebited = amount + amount * bankName.tranferTax;
      if (this.#balance < totalDebited) {
        throw `Saldo insuficiente! Você precisa de ${totalDebited} para realizar essa transação!`;
      }
      this.#balance -= totalDebited;
      anotherAccount.#balance += amount;
      console.log(
        `Seu total agora é ${this.#balance} e você transferiu ${amount}.`
      );
    }
  }

  closeAccount() {
    if (!(this.client instanceof Client)) {
      throw new Error("Essa conta não existe!");
    }
    this.client = undefined;
    this.bank = undefined;
    this.accountNumber = undefined;
    this.agencyNumber = undefined;
  }

  cashWithdrawal(amount) {
    if (this.#balance < amount) {
      throw new Error("Não há saldo suficiente.");
    }
    this.#balance -= amount;
    console.log(`${amount} foi retirado de sua conta.`);
  }
}

const banka1 = new BankAccount(client1, bank1, "123", "123");
const banka2 = new BankAccount(client1, bank1, "321", "321");
const banka3 = new BankAccount(client1, bank2, "696", "969");

class CurrentAccount extends BankAccount {
  constructor(client, bank, accountNumber, agencyNumber) {
    super(client, bank, accountNumber, agencyNumber);
  }

  transferTo(anotherAccount, amount) {
    if (!(anotherAccount instanceof BankAccount)) {
      throw new Error("Essa conta não existe!");
    }

    if (this.balance < amount) {
      throw new Error("Não há crédito suficiente em sua conta!");
    }

    anotherAccount.balance += amount;
    this.balance -= amount;
  }
}

const current1 = new CurrentAccount(client1, bank1, "123", "321");

class SavingAccount extends BankAccount {
  #qtdWithdrawal = 0;
  MAX_OF_WITHDRAWAL = 2;
  withdrawalTax = 0.03;

  constructor(client, bank, accountNumber, agencyNumber) {
    super(client, bank, accountNumber, agencyNumber);
  }

  get qtdWithdrawal() {
    return this.#qtdWithdrawal;
  }

  cashWithdrawal(amount) {
    console.log(
      `Você já fez ${this.#qtdWithdrawal} retirada(s) e tem ${
        this.MAX_OF_WITHDRAWAL
      } retirada(s) gratuita(s)!`
    );

    if (this.MAX_OF_WITHDRAWAL > 0) {
      if (this.balance < amount) {
        throw new Error("Não há saldo suficiente.");
      }
      this.MAX_OF_WITHDRAWAL -= 1;
      this.#qtdWithdrawal += 1;
      this.balance -= amount;
      console.log(
        `${amount} foi retirado de sua conta. Você tem ${this.MAX_OF_WITHDRAWAL} retirada(s) gratuita(s).`
      );
    } else {
      if (this.balance < amount + amount * this.withdrawalTax) {
        throw new Error("Não há saldo suficiente.");
      }
      this.#qtdWithdrawal += 1;
      const totalDebited = amount + amount * this.withdrawalTax;
      this.balance -= totalDebited;
      console.log(
        `${totalDebited} foi retirado de sua conta. Você não possui retiradas gratuitas.`
      );
    }
  }
}

const saving1 = new SavingAccount(client1, bank1, "212", "121");