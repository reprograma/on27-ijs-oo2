const { Bank } = require('./Bank');
const { Client } = require('./Client')
const { BankAccount } = require("./BankAccount");

class CurrentAccount extends BankAccount{
    constructor(client, bank, agency, account){
        super(client, bank, agency, account);
    }

    transferTo(anotherAccount, amount){
        if (!(anotherAccount instanceof BankAccount)) {
			console.log('Informe uma conta válida!');
			return;
		}

		if (this.balance >= amount) {
			this.balance -= amount;
			anotherAccount.balance += amount;

			console.log(`Transferência realizada sem cobrar nenhuma taxa. O saldo atual da conta de origem é de R$ ${this.balance}`);
			
		} else {
			console.log(
				`Saldo insuficiente para realizar a transferência. Seu saldo atual é de R$${this.balance}. 
				Para realizar essa transferência você precisa ter R$${this.balance + amount} em conta.`
			);
		}
    }
}

// const banco = new Bank(2563, 'geiceBB', 0.5)
// const banco2 = new Bank(2773, 'BB', 0.5)

// const cliente = new Client('geice', 236541789)
// const client2 = new Client('margarida', 17897757)
// cliente.addBank(banco2)
// client2.addBank(banco2)
// client2.addBank(banco)

// const conta = new CurrentAccount(cliente, banco2, 2365, 69874512)
// const conta2 = new CurrentAccount(client2, banco, 2365, 69874512)

// conta.balance = 600
// conta2.balance = 10100
// console.log(conta.balance)
// console.log('transferencia 1')
// conta.transferTo(conta2, 265)
// console.log()

// console.log('tranferencia 2')
// conta2.transferTo(conta, 500)

// conta.cashWithdrawal(100);
// conta2.cashWithdrawal(100);
// conta.cashWithdrawal(500);
// conta2.cashWithdrawal(500);
// conta.cashWithdrawal(200);
// conta2.cashWithdrawal(200);
// conta.cashWithdrawal(2000);
// conta2.cashWithdrawal(2000);



module.exports = { CurrentAccount }
