import {
    primeSum, numOfPrimes, generateAllPrimes, isPrime
} from "@Algorithm/array";

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
})

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
})

xdescribe(`Test for Largest Prime`, () => {
    const testCases = [
        { upperLimit: 15, prime: 13 }
    ];

    testCases.forEach(({ upperLimit, prime }) => {
        it(`If uppperLimit: "${upperLimit}", the largest prime is expected to be "${prime}"`, () => {
            expect(numOfPrimes(upperLimit)).toBe(prime);
        });
    });
})

describe(`Test for numOfPrime`, () => {
    const testCases = [
        { upperLimit: 15, num: 6 }
    ];

    testCases.forEach(({ upperLimit, num: expected }) => {
        it(`If uppperLimit: "${upperLimit}", the number of primes less than is: "${expected}"`, () => {
            let received = numOfPrimes(upperLimit);
            expect(received).toBe(expected);
        });
    });
})

describe(`Test for isPrime`, () => {
    const testCases = [
        { num: 15, expected: false }
    ];

    testCases.forEach(({ num, expected }) => {
        it(`Is number "${num}" prime? Answer: "${expected}"`, () => {
            let received = isPrime(num);
            expect(received).toBe(expected);
        });
    });
})