import { Bank } from "./Bank";
import { Client } from "./Client";

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

describe('Should validate methods of the Client class', () => {
  it('Should validate get cpf()', () => {
    expect(client1.cpf).toEqual(21365487612);
    expect(client2.cpf).toEqual(15467823490);
  })

  it('Should hasAccountInThisBank return false', () => {
    expect(client1.hasAccountInThisBank(nubank)).toBeFalsy();
    expect(client1.hasAccountInThisBank(itau)).toBeFalsy();
    expect(client2.hasAccountInThisBank(nubank)).toBeFalsy();
    expect(client2.hasAccountInThisBank(itau)).toBeFalsy();
  });

  it('Should hasAccountInThisBank return true', () => {
    client1.addBank(nubank);
    client2.addBank(nubank);
    client1.addBank(itau);
    client2.addBank(itau);
    expect(client1.hasAccountInThisBank(nubank)).toBeTruthy();
    expect(client1.hasAccountInThisBank(itau)).toBeTruthy();
    expect(client2.hasAccountInThisBank(nubank)).toBeTruthy();
    expect(client2.hasAccountInThisBank(itau)).toBeTruthy();
  })

  it('Should addBank throw ERROR', () => {
    expect(() => {
      client1.addBank('invalidBank');
    }).toThrow(Error('Banco inválido'));
  })

  it('Should addBank throw ERROR', () => {
    client1.addBank(nubank);
    expect(() => {
      client1.addBank(nubank);
    }).toThrow(Error('Ana Costa já é associado(a) ao banco Nubank'));
  })

  it('Should addBank', () => {
    client1.addBank(nubank);
    client1.addBank(itau);
    expect(client1.banks).toEqual([{"bankCode": 101, "bankName": "Nubank"}, {"bankCode": 102, "bankName": "Itau"}])
  })

  it('Should addBank', () => {
    client1.addBank(nubank);
    client1.addBank(itau);
    expect(client1.banks).toEqual([{"bankCode": 101, "bankName": "Nubank"}, {"bankCode": 102, "bankName": "Itau"}])
  })

  it('Should removeBank throw ERROR', () => {
    expect(() => {
      client1.removeBank('invalidBank');
    }).toThrow(Error('Banco inválido'));
  })

  it('Should removeBank throw ERROR', () => {
    expect(() => {
      client1.removeBank(nubank);
    }).toThrow(Error('Ana Costa não é associado(a) ao banco Nubank'));
  })

  it('Should removeBank', () => {
    client1.addBank(nubank);
    client1.addBank(itau);
    client1.removeBank(itau)
    expect(client1.banks).toEqual([{"bankCode": 101, "bankName": "Nubank"}])
  })








})