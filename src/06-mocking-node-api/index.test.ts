// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsPromies from 'fs/promises';
const mockTimeout = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockCallback, mockTimeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, mockTimeout);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, mockTimeout);

    expect(setInterval).toBeCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();

    doStuffByInterval(mockCallback, mockTimeout);

    jest.advanceTimersByTime(mockTimeout);
    jest.advanceTimersByTime(mockTimeout);
    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';

    jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const mockPath = 'pathToFile';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const mockPath = 'pathToFile';
    const mockFileContent = 'content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromies, 'readFile').mockResolvedValue(mockFileContent);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe(mockFileContent);
  });
});
