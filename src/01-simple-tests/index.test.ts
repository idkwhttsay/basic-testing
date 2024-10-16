// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'invalid' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: 'b', action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: 'a', b: 'b', action: Action.Subtract })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 'a', b: 'b', action: Action.Multiply })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: 'a', b: 'b', action: Action.Exponentiate }),
    ).toBe(null);
    expect(simpleCalculator({ a: 'a', b: 'b', action: Action.Divide })).toBe(
      null,
    );
  });
});
