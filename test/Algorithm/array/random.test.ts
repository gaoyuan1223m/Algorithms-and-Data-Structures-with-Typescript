import {
  generateRandomNumber,
  generateIncreasingArray,
  generateDecreasingArray,
  generatePartiallyIncreasingArray,
  generatePartiallyDecreasingArray,
} from "@Algorithm/array";

import {
  isSortedIncreasingly,
  isSortedDecreasingly,
} from '../../Utils';

describe(`Test Random Algorithm`, () => {
  describe(`generateIncreasingArray`, () => {
    it('1. step is larger than 1', () => {
      const length = 25;
      const randomOpt = { min: 5, max: 400 };
      const array = generateIncreasingArray(length, randomOpt);

      expect(array.length).toEqual(length);
      expect(isSortedIncreasingly(array)).toBe(true);
      expect(array[0]).toBe(randomOpt.min);
      expect(array[length - 1]).toBe(randomOpt.max);
    });

    it('2. step is less than 1', () => {
      const length = 2500;
      const randomOpt = { min: 5, max: 400 };
      const array = generateIncreasingArray(length, randomOpt);

      expect(array.length).toEqual(length);
      expect(isSortedIncreasingly(array)).toBe(true);
      expect(array[0]).toBe(randomOpt.min);
      expect(array[length - 1]).toBe(randomOpt.max);
    });

    it('3. length = 0', () => {
      const length = 0;
      const randomOpt = { min: 5, max: 400 };
      const array = generateIncreasingArray(length, randomOpt);

      expect(array).toEqual([]);
    });

    it('4. length < 0', () => {
      const length = -1;
      const randomOpt = { min: 5, max: 400 };
      const array = generateIncreasingArray(length, randomOpt);

      expect(array).toEqual([]);
    });


    it('5. length = 25, min > max', () => {
      const length = -1;
      const randomOpt = { min: 5, max: 4 };
      const array = generateIncreasingArray(length, randomOpt);

      expect(array).toEqual([]);
    });
  });

  describe(`generateDecreasingArray`, () => {
    it('1. step is larger than 1', () => {
      const length = 25;
      const randomOpt = { min: 5, max: 400 };
      const array = generateDecreasingArray(length, randomOpt);

      expect(array.length).toEqual(length);
      expect(isSortedDecreasingly(array)).toBe(true);
      expect(array[0]).toBe(randomOpt.max);
      expect(array[length - 1]).toBe(randomOpt.min);
    });

    it('2. step is less than 1', () => {
      const length = 2500;
      const randomOpt = { min: 5, max: 400 };
      const array = generateDecreasingArray(length, randomOpt);

      expect(array.length).toEqual(length);
      expect(isSortedDecreasingly(array)).toBe(true);
      expect(array[0]).toBe(randomOpt.max);
      expect(array[length - 1]).toBe(randomOpt.min);
    });
  });

  describe(`generatePartiallyIncreasingArray`, () => {
    it('1. step is larger than 1, [15, length) is sorted', () => {
      const length = 25;
      const randomOpt = { min: 5, max: 400, from: 15, to: length };
      const array = generatePartiallyIncreasingArray(length, randomOpt);

      expect(array.length).toEqual(length);
      expect(isSortedIncreasingly(array, randomOpt.from, randomOpt.to)).toBe(true);
      expect(array[length - 1]).toBe(randomOpt.max);
    });

    it('2. step is less than 1, [150, length) is sorted', () => {
      const length = 250;
      const randomOpt = { min: 5, max: 400, from: 150, to: length };
      const array = generatePartiallyIncreasingArray(length, randomOpt);
      console.log(array.toString());

      expect(array.length).toEqual(length);
      expect(isSortedIncreasingly(array, randomOpt.from, randomOpt.to)).toBe(true);
      expect(array[length - 1]).toBe(randomOpt.max);
    });
  });

  describe(`generatePartiallyDecreasingArray`, () => {
    it('1. step is larger than 1, [15, length) is sorted', () => {
      const length = 25;
      const randomOpt = { min: 5, max: 400, from: 15, to: length };
      const array = generatePartiallyDecreasingArray(length, randomOpt);

      expect(array.length).toEqual(length);
      expect(isSortedDecreasingly(array, randomOpt.from, randomOpt.to)).toBe(true);
      expect(array[length - 1]).toBe(randomOpt.min);
    });

    it('2. step is less than 1, [150, length) is sorted', () => {
      const length = 250;
      const randomOpt = { min: 5, max: 400, from: 150, to: length };
      const array = generatePartiallyDecreasingArray(length, randomOpt);

      expect(array.length).toEqual(length);
      expect(isSortedDecreasingly(array, randomOpt.from, randomOpt.to)).toBe(true);
      expect(array[length - 1]).toBe(randomOpt.min);
    });
  });

  describe('generateRandomNumber', () => {
    it('min > max', () => {
      const randomOpt = { min: 100, max: 99 };
      expect(generateRandomNumber(randomOpt)).toBe(NaN);
    });

    it('min = max', () => {
      const randomOpt = { min: 100, max: 100 };
      expect(generateRandomNumber(randomOpt)).toBe(randomOpt.min);
    });

    it('min < max', () => {
      const randomOpt = { min: 1, max: 100 };
      expect(generateRandomNumber(randomOpt)).toBeTruthy();
    });
  });
})