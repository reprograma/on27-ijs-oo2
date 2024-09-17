const { Bank } = require('./Bank');
const { Person } = require('./Person');
const { Manager } = require('./Manager');

class Client extends Person {
	banks = [];

	hasAccountInThisBank(bank) {
		return (
			this.banks.find((element) => element.bank.bankCode === bank.bankCode) !==
			undefined
		);
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

		this.banks.push({bank: bank, manager: this.#getRandomManager(bank)});

		const bankIndex = Bank.createdBanks.findIndex(
			(element) => element.bankCode === bank.bankCode
		);
		Bank.createdBanks[bankIndex].qtdClients++;

		console.log(`Banco ${bank.bankCode} adicionado à cliente ${this.name}. Sua gerente é ${this.banks[this.banks.length - 1].manager.name}.`);
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
			(element) => element.bank.bankCode !== bank.bankCode
		);
		const bankIndex = Bank.createdBanks.findIndex(
			(element) => element.bankCode === bank.bankCode
		);
		Bank.createdBanks[bankIndex].qtdClients--;

		console.log(`Banco ${bank.bankCode} removido da cliente ${this.name}`);
	}

	#getRandomManager(bank) {
		const randomIndex = Math.floor(Math.random() * bank.managers.length);
		bank.managers[randomIndex].addClient(this.name);
		return bank.managers[randomIndex];
	}
}

module.exports = { Client };
