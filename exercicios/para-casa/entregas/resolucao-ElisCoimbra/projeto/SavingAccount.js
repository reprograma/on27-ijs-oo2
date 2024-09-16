const { BankAccount } = require('./BankAccount');

class SavingAccount extends BankAccount {
  #qtdWithdrawal = 0; // quantidade de retiradas de dinheiro banco 24hr
  #MAX_OF_WITHDRAWAL = 2;//quantidade maxima de retiradas gratuitas
  #withdrawalTax = 0.03; // taxa a ser cobrada em cada retirada em banco 24hr
  
  constructor(client, bank, accountNumber, agencyNumber,incomeRate, incomeDay){
    super(client,bank, accountNumber,agencyNumber)
    this.incomeRate = incomeRate; 
    this.incomeDay = incomeDay;
    this.#qtdWithdrawal = 0;
    this.#MAX_OF_WITHDRAWAL = 2;
    this.#withdrawalTax =0.03;

  }

  get qtWithdrawal(){
    return this.#qtdWithdrawal;
  }

  get withdrawalTax(){
    return this.#withdrawalTax;
  }

  set withdrawalTax(newWithdrawalTax){
    this.#withdrawalTax = newWithdrawalTax;
  }

  cashWithdrawal(amount) {
    console.log(`Você já realizou ${this.#qtdWithdrawal} retiradas. Você tem direito a ${this.#MAX_OF_WITHDRAWAL} retiradas gratuitas.`)

    if(this.#qtdWithdrawal < this.#MAX_OF_WITHDRAWAL) {
      if(this.balance >= amount) {
        this.balance -= amount;
        this.#qtdWithdrawal++;
        console.log(`Retirada realizada com sucesso. Seu saldo restante é R$ ${this.balance},00`)
        console.log(`Você possui ${this.qtWithdrawal} retiradas`)
      } else {
        console.log(`Você não tem saldo suficiente para essa operação;`);
      }
    } else {
      const amountWithTax = amount + (amount * this.#withdrawalTax);
      if(this.balance >= amountWithTax) {
        this.balance -= amountWithTax;
        this.#qtdWithdrawal++;
        console.log(`Retirada realizada com sucesso. Seu saldo restante é R$ ${this.balance},00`)

      } else {
        console.log(`Você não tem saldo suficiente para essa operação;`);
      }
    }

    console.log(`Você já realizou ${this.#qtdWithdrawal} retiradas.`);
  }

  generateIncome(currentDay){
    if(currentDay = this.incomeDay){
      this.balance = this.balance + this.incomeRate;
      console.log(`Seu saldo atual é ${this.balance} com rendimento de ${this.incomeRate}`)
    }
    else{
      console.log(`Seu saldo é ${this.balance}`)
    }

  }
}
module.exports = { SavingAccount }