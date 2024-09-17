import { BankAccount } from "./BankAccount";

export class CurrentAccount extends BankAccount {

  transferTo(anotherAccount, amount) {
    if (!(anotherAccount instanceof BankAccount)) {
      throw new Error('Não é possível fazer transferência, conta inválida');
    }
    if(amount < 0) {
      throw new Error('Não é possível fazer transferência, valor passado é menor que 0');
    }
   
    if(amount < super.balance) {
      throw new Error(`Não é possível fazer transferência, saldo insuficiente.
       Seu saldo é R${super.balance} e o valor da transferência R$ ${amount}`)
    }
    super.balance -= amount;
    this.anotherAccount.credit(amount);
    console.log(`O saldo atual da conta de origem é de R$ ${super.balance}`);
   }

}