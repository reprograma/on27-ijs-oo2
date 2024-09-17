const { BankAccount } = require("./BankAccount");

class SavingAccount extends BankAccount {
  incomeRate;
  incomeDay;
  #qtdWithdrawal = 0;
  MAX_OF_WITHDRAWAL = 2;
  #withdrawalTax = 0.03;

  constructor(
    client,
    bank,
    accountNumber,
    agencyNumber,
    incomeDay,
    incomeRate
  ) {
    super(client, bank, accountNumber, agencyNumber);
    this.incomeDay = incomeDay;
    this.incomeRate = incomeRate;
  }

  generateIncome(currentDay) {
    if (currentDay === this.incomeDay) {
      const income = this.balance * (this.incomeRate / 100);
      this.balance += income;
      console.log(`Rendimento gerado: ${income.toFixed(2)}`);
    } else {
      console.log("Nenhum rendimento gerado hoje.");
    }
    return this.balance;
  }
  get qtdWithdrawal() {
    return this.#qtdWithdrawal;
  }

  get withdrawalTax() {
    return this.#withdrawalTax;
  }

  set withdrawalTax(newWithdrawalTax) {
    return (this.#withdrawalTax = newWithdrawalTax);
  }

  cashWithdrawal(amount) {
    console.log(
      `Você realizou ${this.#qtdWithdrawal} retiradas. Você tem direito a ${
        this.MAX_OF_WITHDRAWAL
      } retiradas gratuitas.`
    );

    if (this.#qtdWithdrawal < this.MAX_OF_WITHDRAWAL) {
      if (this.balance >= amount) {
        this.balance -= amount;
        this.#qtdWithdrawal++;
        console.log(
          `Seu novo saldo é de R$ ${
            this.balance
          }, e a quantidade de retiradas feitas foi de ${
            this.#qtdWithdrawal
          } retirada(s)`
        );
      } else {
        console.log(`Você não tem saldo suficiente para fazer a transação.`);
      }
    } else {
      const amountWithTax = amount + amount * this.#withdrawalTax;
      if (this.balance >= amountWithTax) {
        this.balance -= amountWithTax;
        this.#qtdWithdrawal++;
        console.log(
          `Sua retirada foi feita, mas a taxa de ${
            this.#withdrawalTax
          } foi aplicada`
        );
        console.log(
          `Seu novo saldo é de R$ ${this.balance}. Você já realizou ${
            this.#qtdWithdrawal
          } retiradas.`
        );
      } else {
        console.log(`Você não tem saldo suficiente para fazer a transação.`);
      }
    }
  }
}

module.exports = { SavingAccount };
