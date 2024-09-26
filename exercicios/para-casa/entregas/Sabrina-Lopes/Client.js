import { Bank } from "./Bank.js";

export class Client{
    name;
    #cpf;
    banks= []

constructor(name, cpf) {
    this.name = name;
    this.#cpf = cpf;
}
get cpf(){
    console.log(`${this.name} solicitou o CPF: ${this.#cpf}`);
    return this.#cpf;    

}

hasAccountInThisBank(bank) {
        const hasAccount = this.banks.includes(bank);
        if (hasAccount) {
            console.log(`${this.name} tem conta no banco ${bank.bankName}`);
        } else {
            console.log(`${this.name} não tem conta no banco ${bank.bankName}`);
        }
        return hasAccount;
    }

addBank(bank) {
        if (!this.hasAccountInThisBank(bank)) {
            this.banks.push(bank);
            console.log(`${this.name} adicionou o banco ${bank.bankName}`);
        } else {
            console.log(`${this.name} já tem conta no banco ${bank.bankName}`);
        }
    }

removeBank(bank) {
        const index = this.banks.indexOf(bank);
        if (index !== -1) {
            this.banks.splice(index, 1);
            console.log(`${this.name} removeu o banco ${bank.bankName}`);
        } else {
            console.log(`${this.name} não tinha conta no banco ${bank.bankName} para remover`);
        }
    }
}

