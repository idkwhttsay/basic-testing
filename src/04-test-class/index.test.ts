// Uncomment the code below and write your tests
// import { getBankAccount } from '.';

import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(new BankAccount(10).getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => new BankAccount(10).withdraw(20)).toThrowError(
      new InsufficientFundsError(10),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      new BankAccount(10).transfer(20, new BankAccount(0)),
    ).toThrowError(new InsufficientFundsError(10));
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount: BankAccount = new BankAccount(10);
    expect(() => bankAccount.transfer(10, bankAccount)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const bankAccount: BankAccount = new BankAccount(10);
    expect(bankAccount.deposit(10).getBalance()).toBe(20);
  });

  test('should withdraw money', () => {
    const bankAccount: BankAccount = new BankAccount(10);
    expect(bankAccount.withdraw(10).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const bankAccount1: BankAccount = new BankAccount(10);
    const bankAccount2: BankAccount = new BankAccount(10);
    expect(bankAccount1.transfer(10, bankAccount2).getBalance()).toBe(0);
    expect(bankAccount2.getBalance()).toBe(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount: BankAccount = new BankAccount(10);
    const result = await bankAccount.fetchBalance();

    if (result !== null) {
      expect(result).toBeLessThanOrEqual(100);
    } else {
      expect(result).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount: BankAccount = new BankAccount(10);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(50);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount: BankAccount = new BankAccount(10);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      new SynchronizationFailedError(),
    );
  });
});
