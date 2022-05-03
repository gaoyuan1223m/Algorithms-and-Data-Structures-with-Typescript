import { primeSum, numOfPrimes, generateAllPrimes, isPrime } from "@Algorithm/array";

describe('Test Prime Sum', () => {
  describe(`Test for Primes Generation`, () => {

    it(`#List all primes less that 5 (included)`, () => {
      expect(generateAllPrimes(5)).toEqual([2, 3, 5])
    });

    it(`#List all primes less than 18 (included)`, () => {
      expect(generateAllPrimes(18)).toEqual([2, 3, 5, 7, 11, 13, 17]);
    });

    it(`#Return correct size of primes array`, () => {
      expect(generateAllPrimes(699).length).toBe(125);
    });
  });

  describe(`Test from Prime Sum`, () => {
    const testCases = [
      { composite: 15, sums: [[2, 13]] },
      { composite: 12, sums: [[5, 7]] },
      { composite: 45, sums: [[2, 43]] }
    ];

    testCases.forEach(({ composite, sums: expected }) => {
      it(`Test for Composite: ${composite}`, () => {
        const received = primeSum(composite);
        expect(received).toEqual(expected);
      });
    });
  });

  describe(`Test for numOfPrime`, () => {
    const testCases = [
      { upperLimit: 15, num: 6 },
      { upperLimit: 17, num: 6 },
      { upperLimit: 20, num: 8 },
      { upperLimit: 50, num: 15 },
      { upperLimit: 99, num: 25 },
    ];

    testCases.forEach(({ upperLimit, num: expected }) => {
      it(`less then "${upperLimit}", the number of primes is: "${expected}"`, () => {
        expect(numOfPrimes(upperLimit)).toBe(expected);
      });
    });
  });

  describe(`Test for isPrime`, () => {
    const testCases = [
      { num: 2, expected: true },
      { num: 3, expected: true },
      { num: 5, expected: true },
      { num: 7, expected: true },
      { num: 11, expected: true },
      { num: 13, expected: true },
      { num: 15, expected: false },
      { num: 17, expected: true },
      { num: 19, expected: true },
      { num: 23, expected: true },
      { num: 29, expected: true },
      { num: 31, expected: true },
      { num: 41, expected: true },
      { num: 47, expected: true },
      { num: 53, expected: true },
      { num: 59, expected: true },
      { num: 61, expected: true },
      { num: 67, expected: true },
      { num: 71, expected: true },
      { num: 73, expected: true },
      { num: 79, expected: true },
      { num: 83, expected: true },
      { num: 89, expected: true },
      { num: 97, expected: true },
      { num: 98, expected: false },
      { num: 101, expected: true },
      { num: 283, expected: true },
      { num: 401, expected: true },
      { num: 419, expected: true },
      { num: 431, expected: true },
      { num: 449, expected: true },
      { num: 457, expected: true },
      { num: 673, expected: true },
      { num: 677, expected: true },
      { num: 683, expected: true },
      { num: 691, expected: true },
    ];

    testCases.forEach(({ num, expected }) => {
      it(`Is number "${num}" prime? Answer: "${expected}"`, () => {
        let received = isPrime(num);
        expect(received).toBe(expected);
      });
    });
  });
});
