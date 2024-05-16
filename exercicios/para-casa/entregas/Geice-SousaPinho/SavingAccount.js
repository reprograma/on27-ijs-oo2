const { Bank } = require("./Bank");
const { Client } = require("./Client");
const { BankAccount } = require("./BankAccount");
const { CurrentAccount } = require("./CurrentAccount");

class SavingAccount extends BankAccount {
  #qtdWithdrawal = 0;
  #MAX_OF_WITHDRAWAL = 2;
  #withdrawalTax = 0.03;
  incomeRate;
  incomeDay;

  constructor(client, bank, account, agency, incomeDay, incomeRate) {
    super(client, bank, account, agency);
    this.incomeDay = incomeDay;
    this.incomeRate = incomeRate;
  }

  cashWithdrawal(amount) {
    console.log(
      `**************\nOlá ${this.client.name.toUpperCase()}! Você tem ${
        this.#MAX_OF_WITHDRAWAL
      } retiradas gratuitas por mês. \n Retiradas realizadas: ${
        this.#qtdWithdrawal
      }.\n**************`
    );

    // Caso o cliente NAO tenha saldo suficiente
    if (this.balance < amount) {
      console.log(
        `O saque não pode ser realizado, pois não há saldo suficiente. \n Saldo atual: R$${this.balance}.`
      );
    } else {
      // Caso o cliente ainda tenha retiradas gratuitas
      if (this.#qtdWithdrawal < this.#MAX_OF_WITHDRAWAL) {
        this.balance -= amount;
        this.#qtdWithdrawal++;
        console.log(
          `Retirada no valor de R$${amount} realizada com sucesso.\n Seu saldo restante é R$ ${this.balance.toFixed(
            2
          )}.\n Retiradas realizadas: ${this.#qtdWithdrawal}`
        );

        return;
      }

      // Caso o cliente NAO tenha retiradas gratuitas
      if (this.#qtdWithdrawal >= this.#MAX_OF_WITHDRAWAL) {
        const amountAndTax = amount + amount * this.#withdrawalTax;

        if (this.balance < amountAndTax) {
          console.log(
            `Você não possui saldo suficiente para realizar a operação nessa quantia.\n Saldo atual: R$${this.balance.toFixed(
              2
            )}.`
          );

          return;
        }

        this.balance -= amountAndTax;
        this.#qtdWithdrawal++;
        console.log(
          `Operação realizada com sucesso.\n Saldo atual: R$${this.balance.toFixed(
            2
          )}\n Taxa de saque: R$${
            amount * this.#withdrawalTax
          }\n Retiradas realizadas: ${this.#qtdWithdrawal}.`
        );
      }
    }
  }

  get qtdWithdrawal() {
    return this.#qtdWithdrawal;
  }

  get withdrawalTax() {
    return this.#withdrawalTax;
  }

  set withdrawalTax(newTax) {
    return (this.#qtdWithdrawal = newTax);
  }

  generateIncome(currentDay) {
    if (currentDay === this.incomeDay) {
      this.balance += this.balance * this.incomeRate;
      console.log(
        `Seu novo saldo é ${this.balance}. O valor do rendimento foi de R$ ${
          this.balance * this.incomeRate
        }.`
      );
      return;
    } else {
      console.log(`Nenhuma data correspondente foi encontrada.`);
    }
  }
}

// const banco2 = new Bank(2773, "BB", 0.5);

// const cliente = new Client("geice", 236541789);
// cliente.addBank(banco2);

// console.log();

// const poupanca = new SavingAccount(cliente, banco2, 123, 456, "20/12", 0.2);
// console.log(poupanca);
// console.log("credito");

// poupanca.creditAmount(2000);

// console.log("debito");
// poupanca.debitAmount(500);

// console.log("rendimento");
// poupanca.generateIncome("20/12");

// console.log();
// console.log("insuficiente");
// poupanca.cashWithdrawal(800000);
// console.log("saque 24h");
// poupanca.cashWithdrawal(52);
// poupanca.cashWithdrawal(48);
// console.log("48 fim");
// console.log();

// console.log();
// poupanca.cashWithdrawal(100);
// poupanca.cashWithdrawal(500);
// poupanca.cashWithdrawal(200);
// poupanca.cashWithdrawal(2000);

module.exports = { SavingAccount }
