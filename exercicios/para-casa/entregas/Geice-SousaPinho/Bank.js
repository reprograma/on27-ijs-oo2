class Bank {
	bankCode;
	bankName;
	#trasferTax;

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
}

const banco = new Bank(5625, 'geiceBB', 5.00)
console.log(banco)


module.exports = { Bank };
