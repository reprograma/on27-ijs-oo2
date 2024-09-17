import { BankAccount } from "./BankAccount";

export class SavingAccount extends BankAccount {
  incomeRate;
  incomeDay;
  #qtdWithdrawal = 0;
  MAX_OF_WITHDRAWAL = 2;
  #withdrawalTax = 0.03;

  constructor(incomeRate, incomeDay){
    super(client,bank,accountNumber,agencyNumber,balance)
    this.incomeRate = incomeRate;
    this.incomeDay = incomeDay

  }

  generateIncome(currentDay){
    if(currentDay === this.incomeDay) {
      this.balance += this.balance * this.incomeRate;
    } else {
      return 'Não é dia de rendimento'
    }
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

}