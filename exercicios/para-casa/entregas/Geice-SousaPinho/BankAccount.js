const { Bank } = require('./Bank');
const { Client } = require('./Client');

class BankAccount {
	client;
	bank;
	accountNumber;
	agencyNumber;
	#balance = 0;

	constructor(client, bank, accountNumber, agencyNumber) {
		if (!(client instanceof Client)) {
			return new Error('Informe um cliente válido');
		}
		if (!(bank instanceof Bank)) {
			return new Error('Informe um banco válido');
		}
		if (
			client.banks.find((element) => element.bankCode === bank.bankCode) ===
			undefined
		) {
			return new Error(
				`Cliente do CPF ${client.cpf} não possui conta no banco ${bank.bankName}`
			);
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
		console.log(`O novo saldo da conta é: R$ ${this.#balance}`);
	}

	debitAmount(amount) {
		this.#balance -= amount;
		console.log(`O novo saldo da conta é: R$ ${this.#balance}`);
	}

	transferTo(anotherAccount, amount) {
		if (!(anotherAccount instanceof BankAccount)) {
			console.log('Informe uma conta válida!');
			return;
		}

		let amountToBeDebited = amount;
		if (this.bank.bankCode !== anotherAccount.bank.bankCode) {
			amountToBeDebited = amount + amount * this.bank.transferTax;
			console.log(
				`Essa transferência terá uma taxa de ${
					this.bank.transferTax * 100
				}%, pois se trata de uma transferência entre bancos diferentes.`
			);
		}

		if (this.#balance >= amountToBeDebited) {
			this.#balance -= amountToBeDebited;
			anotherAccount.balance += amount;

			console.log(`Tranferência de R$${amount} realizada. O saldo atual da conta de origem é de R$ ${this.#balance}`);
			console.log(
				`O saldo atual da conta de destino é de R$ ${anotherAccount.balance}`
			); // não precisa informar o valor da conta alheia
		} else {
			console.log(
				`Saldo insuficiente para realizar a transferência. Seu saldo atual é de ${
					this.balance
				}. Para realizar essa transferência você precisa ter ${this.balance + (amount * this.bank.transferTax)} em conta.`
			);
		}
	}

	closeAccount() {
		if (this.#balance === 0) {
			console.log(
				`Encerrando conta de ${this.client.name} no banco ${this.bank.bankName}.`
			);
			this.client = undefined;
			this.accountNumber = undefined;
			this.agencyNumber = undefined;
			this.bank = undefined;
			console.log(`Conta encerrada!`);
		} else {
			console.log(
				`Você possui um saldo de R$ ${
					this.#balance
				}. Para encerrar a conta é necessário que o saldo seja igual a zero.`
			);
		}
	}

	// Criar método cashWithdrawal saque em banco 24h
	cashWithdrawal(amount) {
		// Implementar esse método
		if (amount === undefined || amount === 0 || amount < 0){
			console.log('Digite um valor válido.')
			return
		}
		if(amount > this.#balance){
			console.log(`Para realizar o saque você precisa ter R$${amount} disponível em sua conta.`)
			return
		}
		{
			this.#balance -= amount
			console.log(`Saque no valor de R$${amount} realizado com sucesso, seu saldo atual é R$${this.#balance}.`)
		}
	}
}

// const banco = new Bank(2563, 'geiceBB', 0.5)
// const banco2 = new Bank(2773, 'BB', 0.5)
// console.log(banco)

// const cliente = new Client('geice', 236541789)
// const client2 = new Client('margarida', 17897757)
// cliente.addBank(banco2)
// client2.addBank(banco2)
// client2.addBank(banco)

// const conta = new BankAccount(cliente, banco2, 2365, 69874512)
// const conta2 = new BankAccount(client2, banco, 2365, 69874512)
// console.log(conta)

// console.log()
// conta.balance = 600
// conta.transferTo(conta2, 265)

// conta.creditAmount(200)
// conta.debitAmount(50)

// conta.cashWithdrawal()

module.exports = { BankAccount };
