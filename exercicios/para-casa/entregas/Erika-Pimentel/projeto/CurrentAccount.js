const { BankAccount } = require('./BankAccount');

class CurrentAccount extends BankAccount {
  transferTo(anotherAccount, amount) {
    if (!(anotherAccount instanceof BankAccount)) {
      throw new Error('Conta inválida!');
    }
    if(amount < 0) {
      throw new Error('Insira um valor maior que zero');
    }
    if(amount < super.balance) {
      throw new Error('Não é possível fazer transferência, saldo insuficiente')
    }
    super.balance -= amount;
    this.anotherAccount.credit(amount);
   }
}