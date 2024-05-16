const { Manager } = require('./Manager.js')

class Bank {
	bankCode;
	bankName;
	#trasferTax;
	managers = [];

	static createdBanks = [];

	constructor(bankCode, bankName, transferTax) {
		this.bankCode = bankCode;
		this.bankName = bankName;
		this.#trasferTax = transferTax;
		this.constructor.createdBanks.push({
			bankCode: this.bankCode,
			qtdClients: 0,
		});
	}

	get transferTax() {
		return this.#trasferTax;
	}

	contractManager(manager){
		if (manager instanceof Manager){
			this.managers.push(manager)
		}
		return
	}
}

// const banco = new Bank(5625, 'geiceBB', 5.00)
// console.log(banco)

module.exports = { Bank };
