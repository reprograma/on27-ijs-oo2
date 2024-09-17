import { Bank } from './Bank'
export class Client {
  name;
  #cpf;
  banks = []

  constructor(name, cpf){
    this.name = name;
    this.#cpf = cpf
  }

  get cpf(){
    return this.#cpf;
  }

  //verificar
  hasAccountInThisBank(checkBank){
    return this.banks.some(bank => bank.bankCode === checkBank.bankCode);
  }

  addBank(bank){
    if(!(bank instanceof Bank)) {
      throw new Error('Banco inválido');
    }
    const hasBank = this.banks.some(object => bank.bankCode === object.bankCode);
    if((hasBank)) {
      throw new Error(`${this.name} já é associado(a) ao banco ${bank.bankName}`)
    } else {
      this.banks.push(bank);
      const createdBank = Bank.createdBanks.find((createdBank) => createdBank.bankCode === bank.bankCode)
      createdBank.qtdClient++     
    }
  }

  removeBank(bank){
    if(!(bank instanceof Bank)) {
      throw new Error('Banco inválido');
    }
    const hasBank = this.banks.some(object => bank.bankCode === object.bankCode);
    if(!(hasBank)) {
      throw new Error(`${this.name} não é associado(a) ao banco ${bank.bankName}`)
    } else {
     this.banks = this.banks.filter((associateBank) => associateBank.bankCode !== bank.bankCode);
      const createdBank = Bank.createdBanks.find((createdBank) => createdBank.bankCode === bank.bankCode)
      createdBank.qtdClient--  
    }
  }
}