import { Bank } from "./Bank";
import { BankAccount } from "./BankAccount";
import { Client  } from "./Client";

let nubank;
let itau;
let client1;
let client2;
let accountClient1;
let accountClient2;
let accountClient2itau;


beforeEach(() => {
  Bank.createdBanks = [];
  nubank = new Bank(101, 'Nubank', 0.01);
  itau = new Bank(102, 'Itau', 0.02);
  client1 = new Client('Ana Costa', 21365487612);
  client2 = new Client('Luiz Silva', 15467823490);
  accountClient1 = new BankAccount(client1,nubank,9182134,12)
  accountClient2 = new BankAccount(client2,nubank,9182134,12)
  accountClient2itau = new BankAccount(client2,itau,912134,11)
})

describe('Should validate methodes of the BankAccount class', () => {

it('should get balance', () => {
  expect(accountClient1.balance).toEqual(0)
})

it('should set balance', () => {
  accountClient1.balance = 1000;
  expect(accountClient1.balance).toEqual(1000)
})

it('should creditAmount', () => {
  accountClient1.creditAmount(200);
  expect(accountClient1.balance).toEqual(200)
})

it('should debitAmount', () => {
  accountClient1.creditAmount(200);
  accountClient1.debit(100);
  expect(accountClient1.balance).toEqual(100)
})

it('should transfer', () => {
  accountClient1.creditAmount(200);
  accountClient1.transferTo(accountClient2, 100);
  expect(accountClient1.balance).toEqual(100)
  expect(accountClient2.balance).toEqual(100)
})

it('should transfer to different bank', () => {
  accountClient1.creditAmount(200);
  accountClient1.transferTo(accountClient2itau, 100);
  expect(accountClient1.balance).toEqual(99)
  expect(accountClient2itau.balance).toEqual(100)
})

it('should close account', () => {
  accountClient1.closeAccount()
  expect(accountClient1).toEqual({"accountNumber": undefined, "agencyNumber": undefined, "bank": undefined, "client": undefined})
})

it('should not close account', () => {
  accountClient2.creditAmount(100);
  expect(() => {
    accountClient2.closeAccount();
  }).toThrow(Error('Não é possível encerrar a conta, ainda há saldo'));
})

it('should cashwithdrawal', () => {
  accountClient2.creditAmount(200);
  accountClient2.cashWithdrawal(200);
  expect(accountClient2.balance).toEqual(0)
}) 
})