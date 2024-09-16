export class Bank {
  bankCode;
  bankName;
  #transferTax;
  static createdBanks = [];

  constructor(bankCode, bankName, transferTax) {
    this.bankCode = bankCode;
    this.bankName = bankName;
    this.#transferTax = transferTax;
  }

  get tranferTax() {
    return this.#transferTax;
  }
}

export const bank1 = new Bank(111, "NeoBank", 0.02);
export const bank2 = new Bank(222, "BankOfStars", 0.05);