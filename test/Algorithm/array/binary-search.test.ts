import { mySqrt, binarySearch } from "@Algorithm/array";
import { catchErr, Errors } from "@Utils/error-handling";

describe(`Test for int-SQRT`, () => {
  const validTestCases = [
    { params: 14, expected: 3 },
    { params: 65, expected: 8 },
    { params: 35, expected: 5 },
    { params: 100, expected: 10 },
    { params: 81, expected: 9 },
  ];

  const inValidTestCases = [
    { params: -14.5, err: Errors.Msg.NotPositiveInteger },
    { params: Number.MAX_SAFE_INTEGER + 1, err: Errors.Msg.NotSafeNum },
    { params: Number.MIN_SAFE_INTEGER - 1, err: Errors.Msg.NotSafeNum },
    { params: NaN, err: Errors.Msg.InvalidArg },
    { params: null, err: Errors.Msg.InvalidArg },
    { params: undefined, err: Errors.Msg.InvalidArg },
    { params: Infinity, err: Errors.Msg.NotSafeNum }
  ];

  describe.each(validTestCases)('1. test for normal values', ({ params, expected }) => {
    it(`SQRT of "${params}" should be "${expected}"`, () => {
      const received = mySqrt(params);
      expect(received).toBe(expected);
    });
  });

  describe.each(inValidTestCases)('2. test for abnormal values', ({ params, err }) => {
    it(`SQRT of "${params}" should throw exceptions`, () => {
      expect(catchErr(mySqrt)(params)).toBe(err);
    });
  });
});

describe(`Test for binarySearch`, () => {
  const validTestCases = [
    { params: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], number: 3, from: 5, to: 10 }, expected: -1 },
    { params: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], number: 3, from: 0, to: 10 }, expected: 2 },
    { params: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], number: 3, from: NaN, to: 10 }, expected: 2 },
    { params: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], number: 3, from: 0, to: NaN }, expected: 2 },
    { params: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], number: 9 }, expected: 8 },
  ];

  describe.each(validTestCases)('1. test for normal values', ({ params: { array, number, from, to }, expected }) => {
    it(`Binary Search "${number}" should be "${expected}"`, () => {
      const received = binarySearch(array, number, from, to);
      expect(received).toBe(expected);
    });
  });
});