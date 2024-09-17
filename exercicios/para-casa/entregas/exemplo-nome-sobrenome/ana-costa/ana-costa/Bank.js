export class Bank {
  bankCode;
  bankName;
  #transferTax;
  static createdBanks = [];

  constructor(bankCode, bankName, transferTax) {
    this.bankCode = bankCode;
    this.bankName = bankName;
    this.#transferTax =  transferTax;
    Bank.createdBanks.push({ bankCode, bankName, qtdClient: 0 });
  }

  getTransferTax() {
    return this.#transferTax;
  }
}