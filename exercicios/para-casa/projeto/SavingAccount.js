const { BankAccount } = require('./BankAccount');

class SavingAccount extends BankAccount {
	#qtdWithdrawal = 0;
	#MAX_OF_WITHDRAWAL = 2;
	#withdrawalTax = 0.03;
	incomeRate;
	IncomeDay;

	constructor(client, bank, accountNumber, agencyNumber, incomeRate, incomeDay) {
		super(client, bank, accountNumber, agencyNumber);
		this.incomeRate = incomeRate;
		this.IncomeDay = incomeDay;
	}

	cashWithdrawal(amount) {
		console.log(`Você já realizou ${this.#qtdWithdrawal} retiradas. Você tem direito a ${this.#MAX_OF_WITHDRAWAL} retiradas gratuitas.`)

		if(this.#qtdWithdrawal < this.#MAX_OF_WITHDRAWAL) {
			if(this.balance >= amount) {
				this.balance -= amount;
				this.#qtdWithdrawal++;
				console.log(`Retirada realizada com sucesso. Seu saldo restante é R$ ${this.balance},00`)
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

	generateIncome(currentDay) {
		if(currentDay === this.IncomeDay) {
			const income = this.balance * this.incomeRate;
			this.balance += income;
			console.log(`Seu saldo foi atualizado com o rendimento de R$ ${income.toFixed(2)}. Seu saldo atual é de R$ ${this.balance.toFixed(2)}`);
		} else {
			console.log(`Ainda não é dia de rendimento. O dia de rendimento é ${this.IncomeDay}`);
		}
	}
}

module.exports = { SavingAccount }; 