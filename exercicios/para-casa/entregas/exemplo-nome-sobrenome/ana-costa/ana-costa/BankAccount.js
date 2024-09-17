import { Client } from './Client'
import { Bank } from './Bank'

export class BankAccount {
  client;
  bank;
  accountNumber;
  agencyNumber;
  #balance = 0;


  constructor(client,bank,accountNumber,agencyNumber){
    if(!(client instanceof Client)) {
      throw new Error('Não é possível abrir conta, cliente inválido');
    }

    if(!(bank instanceof Bank)) {
      throw new Error('Não é possível abrir conta, banco inválido');
    }

    this.client = client;
    this.bank = bank;
    this.accountNumber = accountNumber;
    this.agencyNumber = agencyNumber;
  }

  get balance() {
    return this.#balance;
  }

  set balance(newBalance){
    this.#balance = newBalance;
  }

  creditAmount(amount){
    if(typeof amount !== 'number') {
      throw new Error('Não é possível creditar valor, valor passado não é do tipo number');
    }
    if(amount < 0) {
      throw new Error('Não é possível creditar valor, valor passado é menor que 0')
    }
    this.#balance += amount;
  }

  debit(amount) {
    if(typeof amount !== 'number') {
      throw new Error('Não é possível debitar valor, valor passado não é do tipo number');
    }
    if(amount < 0) {
      throw new Error('Não é possível debitar valor, valor passado é menor que 0')
    }
    this.#balance -= amount;
    console.log(`O novo saldo da conta é: R$ ${this.#balance.toFixed(2)}`)
  }

  transferTo(anotherAccount, amount) {
    if (!(anotherAccount instanceof BankAccount)) {
      throw new Error('Não é possível fazer transferência, conta inválida');
    }
    if(amount < 0) {
      throw new Error('Não é possível fazer transferência, valor passado é menor que 0');
    }
    const isTransferToOtherBank = this.bank.bankCode !== anotherAccount.bank.bankCode;
    const totalAmount = isTransferToOtherBank ? (amount + (amount * this.bank.getTransferTax())) : amount;
    if(totalAmount > this.balance) {
      throw new Error(`Não é possível fazer transferência, saldo insuficiente.
       Seu saldo é R${this.balance} e o valor da transferência R$ ${totalAmount}`)
    }
    this.debit(totalAmount);
    anotherAccount.creditAmount(amount);
    console.log(`O saldo atual da conta de origem é de R$ ${this.#balance}`);
   }

   closeAccount(){
    if(this.balance !== 0) {
      throw new Error('Não é possível encerrar a conta, ainda há saldo')
    }

    Object.assign(this, {
      client: undefined,
      accountNumber: undefined,
      agencyNumber: undefined,
      bank: undefined
    });
   }

   cashWithdrawal(amount) {
    if(amount <= this.balance) {
      this.debit(amount)
    } else {
      throw new Error(`Não foi possível realizar saque, saldo insuficiente`)
    }
   }
}