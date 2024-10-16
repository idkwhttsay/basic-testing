// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: CallableFunction) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockCreate = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: null }),
    });

    (axios.create as jest.Mock).mockImplementation(mockCreate);

    await throttledGetDataFromApi('posts/1');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: null });

    const mockCreate = jest.fn().mockReturnValue({
      get: mockGet,
    });

    (axios.create as jest.Mock).mockImplementation(mockCreate);

    await throttledGetDataFromApi('posts/1');

    expect(mockGet).toHaveBeenCalledWith('posts/1');
  });

  test('should return response data', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: null });

    const mockCreate = jest.fn().mockReturnValue({
      get: mockGet,
    });

    (axios.create as jest.Mock).mockImplementation(mockCreate);

    const result = await throttledGetDataFromApi('posts/1');

    expect(result).toBe(null);
  });
});
