// Uncomment the code below and write your tests
// import { generateLinkedList } from './index';

import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const input = [1];
    const result = generateLinkedList(input);

    expect(result).toStrictEqual({
      next: {
        next: null,
        value: null,
      },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = generateLinkedList(input);
    expect(result).toMatchSnapshot();
  });
});
