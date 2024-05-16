const { Bank } = require('./Bank');

class Client {
	name;
	#cpf;
	banks = [];

	constructor(name, cpf) {
		this.name = name;
		this.#cpf = cpf;
	}

	get cpf() {
		return this.#cpf;
	}

	hasAccountInThisBank(bank) {
		return (
			this.banks.find((element) => element.bankCode === bank.bankCode) !==
			undefined
		); // vai fazer o find para buscar o banco no array, se encontrar, retorna true, se não encontrar é pq é undefinde e retorna false
	}

	addBank(bank) {
		if (!(bank instanceof Bank)) {
			console.log('Informe um banco válido');
			return;
		}

		if (this.hasAccountInThisBank(bank)) {
			console.log(
				`Cliente do CPF ${this.cpf} já possui conta no banco ${bank.bankName}`
			);
			return;
		}

		this.banks.push(bank);
		const bankIndex = Bank.createdBanks.findIndex(
			(element) => element.bankCode === bank.bankCode
		);
		Bank.createdBanks[bankIndex].qtdClients++;

		console.log(`Banco ${bank.bankCode} adicionado à cliente ${this.name}.`);
	}

	removeBank(bank) {
		if (!(bank instanceof Bank)) {
			console.log('Informe um banco válido');
			return;
		}

		if (!this.hasAccountInThisBank(bank)) {
			console.log(
				`Cliente do CPF ${this.cpf} não possui conta no banco ${bank.bankName} para ser removida`
			);
			return;
		}

		this.banks = this.banks.filter(
			(element) => element.bankCode !== bank.bankCode
		);
		const bankIndex = Bank.createdBanks.findIndex(
			(element) => element.bankCode === bank.bankCode
		);
		Bank.createdBanks[bankIndex].qtdClients--;

		console.log(`Banco ${bank.bankCode} removido da cliente ${this.name}`);
	}
}

// const banco = new Bank(2563, 'geiceBB', 0.5)
// const banco2 = new Bank(2773, 'BB', 0.5)
// console.log(banco)

// const cliente = new Client('geice', 236541789)
// console.log(cliente)

// console.log(cliente.cpf)
// cliente.addBank(banco)
// cliente.addBank(banco2)
// console.log(cliente.banks)
// cliente.removeBank(banco)
// console.log(cliente.banks)

module.exports = { Client };
