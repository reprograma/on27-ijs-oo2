const { Bank } = require('./Bank.js');
const { Person } = require('./Person.js');

class Client extends Person {
	banks = [];

	constructor(name, cpf) {
		super(name, cpf)
	}

	static getAnyManager(bank){
		
		if (bank.managers.length === 0){
			console.log(`O Banco ${bank.bankName} ainda não possui gerentes.`)
		}

		const index =Math.floor(Math.random() * bank.managers.length); // Math.floor(Math.random() * bank.managers.length); // index aleatorio de acordo com o tamanho do array de gerentes
		const anManager = bank.anManagers[index]

		anManager.addClient({name: this.name, cpf: this.cpf}) // em banco, a lista de gerentes, e o gerente na posição aleatória que vai receber/adc o cliente no paramentro
		console.log(`Desiguinamos ${anManager.name} ${anManager} como gerente para você.`);
		
		return anManager
	}

	hasAccountInThisBank(bank) {
		return (
			this.banks.find((element) => element.bank.bankCode === bank.bankCode) !==
			undefined
		); // vai fazer o find para buscar o banco no array, se encontrar, retorna true, se não encontrar é pq é undefined e retorna false
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

		const anyManager = this.getAnyManager(bank)

		this.banks.push({banco: bank, gerente: anyManager});

		const bankIndex = Bank.createdBanks.findIndex(
			(element) => element.bankCode === bank.bankCode
		);
		Bank.createdBanks[bankIndex].qtdClients++;
		
		console.log(`Banco ${bank.bankCode} adicionado à cliente ${this.name}; Gerente responsável: ${anyManager}.`);
	}

	removeBank(bank) {
		if (!(bank instanceof Bank)) {
			console.log('Informe um banco válido');
			return;
		}

		if (!this.hasAccountInThisBank(bank)) {
			console.log(
				`Cliente do CPF ${this.cpf} não possui conta no banco ${bank.bankName} para ser removida.`
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
}

const banco = new Bank(2563, 'geiceBB', 0.5)
const banco2 = new Bank(2773, 'BB', 0.5)
console.log(banco)

const cliente = new Client('geice', 236541789)
console.log(cliente)

// console.log(cliente.cpf)
cliente.addBank(banco)
// cliente.addBank(banco2)
// console.log(cliente.banks)
// cliente.removeBank(banco)
// console.log(cliente.banks)

module.exports = { Client };
