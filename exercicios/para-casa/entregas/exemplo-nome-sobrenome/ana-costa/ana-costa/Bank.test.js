import { Bank } from "./Bank";
import { Client  } from "./Client";

let nubank;
let itau;
let client1;
let client2;


beforeEach(() => {
  Bank.createdBanks = [];
  nubank = new Bank(101, 'Nubank', 0.01);
  itau = new Bank(102, 'Itau', 0.02);
  client1 = new Client('Ana Costa', 21365487612);
  client2 = new Client('Luiz Silva', 15467823490);
})

describe('Should validate methods of the class Bank', () => {
  it('Should validate getTransferTax()', () => {
    expect(nubank.getTransferTax()).toEqual(0.01);
    expect(itau.getTransferTax()).toEqual(0.02);
  })

  it('Should validate createdBanks', () => {
    expect(Bank.createdBanks).toEqual(
      [{"bankCode": 101, "bankName": "Nubank", "qtdClient": 0}, {"bankCode": 102, "bankName": "Itau", "qtdClient": 0}]
    );
  })

  it('Should validate createdBanks when have clients', () => {
    client1.addBank(nubank);
    client2.addBank(nubank);
    client1.addBank(itau);
    client2.addBank(itau);
    expect(Bank.createdBanks).toEqual(
      [{"bankCode": 101, "bankName": "Nubank", "qtdClient": 2}, {"bankCode": 102, "bankName": "Itau", "qtdClient": 2}]
    );
  })
})