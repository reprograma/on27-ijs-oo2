import { Bank } from "./Bank.js"

export class Client {
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
    const bankIndex = this.banks.findIndex(
      (bankSearched) => bankSearched === bank
    );
    if (
      bank instanceof Bank &&
      this.banks[bankIndex].bankName === bank.bankName
    ) {
      return console.log("Essa pessoa TEM conta nesse banco!");
    }
    return console.log("Essa pessoa NÃO TEM conta nesse banco...");
  }

  addBank(bank) {
    this.banks.push(bank);
    console.log(`O banco ${bank.bankName} foi adicionado!`);
  }

  removeBank(bank) {
    const bankIndex = this.banks.findIndex(
      (bankSearched) => bankSearched === bank
    );
    this.banks.splice(bankIndex, 1);
    console.log(`O banco ${bank.bankName} foi removido.`);
  }
}

export const client1 = new Client("Fushiguro", 123123123);