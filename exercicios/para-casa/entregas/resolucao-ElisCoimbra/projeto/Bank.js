const{ Manager } = require("./Manager")
class Bank {
	bankCode;
	bankName;
	#trasferTax;
	managers;

	static createdBanks = [];

	constructor(bankCode, bankName, transferTax) {
		this.bankCode = bankCode;
		this.bankName = bankName;
		this.#trasferTax = transferTax;
		this.managers = [];
		this.constructor.createdBanks.push({
			bankCode: this.bankCode,
			qtdClients: 0,
		});
	}

	get transferTax() {
		return this.#trasferTax;
	}

	contractManager(manager){
		if(manager instanceof Manager){
			this.managers.push(manager)
		}
	}
}

module.exports = { Bank };
