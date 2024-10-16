// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 1, action: Action.Add, expected: 3 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'invalid', expected: null },
  { a: 'a', b: 'b', action: Action.Add, expected: null },
  { a: 'a', b: 'b', action: Action.Subtract, expected: null },
  { a: 'a', b: 'b', action: Action.Divide, expected: null },
  { a: 'a', b: 'b', action: Action.Multiply, expected: null },
  { a: 'a', b: 'b', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)(
    `should return $expected for $a and $b with action $action`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
    },
  );
});
