import 'module-alias/register';

/**
 * 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101 
 * 103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 
 * 199 211 223 227 229 233 239 241 251 257 263 269 271 277 281 283 293 307 311 
 * 313 317 331 337 347 349 353 359 367 373 379 383 389 397 401 409 419 421 431 
 * 433 439 443 449 457 461 463 467 479 487 491 499 503 509 521 523 541 547 557 
 * 563 569 571 577 587 593 599 601 607 613 617 619 631 641 643 647 653 659 661 
 * 673 677 683 691 701 709 719 727 733
 */

/**
 * Return an array<number> containing element from 0 to n (n included)
 */

export const generateArrWithUpperLimit = (n: number): number[] => {
    // O(n)
    return Array.from({ length: n + 1 }, (v, k) => k);
}

/**
 * Filter out all composite numbers from the array<number> that contains element from 0 to n
 * @param arr: must be increasingly sorted
 */
export const filterOutCompositeNumbers = (arr: number[]): number[] => {

    const n = Math.ceil(Math.sqrt(arr.length));

    for (let i = 0; i < n; i++) {
        if (arr[i] === 0 || arr[i] === 1) continue;

        for (let j = i + i; j < arr.length; j += i) {
            if (arr[j] === 0) continue;

            arr[j] = 0;
        }
    }

    return arr.filter(a => a !== 0 && a !== 1);
}

/**
 * A composite number must be a sum of two primes
 * @param n: Composite number
 */
export const primeSum = (n: number): number[][] | number[] => {

    const primes = filterOutCompositeNumbers(generateArrWithUpperLimit(n));
    console.log(primes);
    const pairMap = new Map<number, number>();
    const result = [];

    for (let i = 0; i < primes.length; i++) {
        let key = Math.round(n - primes[i]);

        if (pairMap.has(primes[i])) {
            result.push([key, primes[i]]);
        } else {
            pairMap.set(key, primes[i])
        }
    }
    return result.length ? result.reverse() : [-1, -1];
}

// console.log(primeSum(12));


/**
 * Return the number of primes less then n
 * @param n given a random integer
 * @ For LeetCode Solutions
 */
export const primes = (n: number): number => {
    let count = 0;
    let l = Math.floor(n / 32) + 1;
    let arr = [];
    for (let i = 0; i < l; i++) {
        arr.push(0);
    }

    for (let i = 2; i < n; i++) {
        if ((arr[Math.floor(i / 32)] & (1 << (i & 31))) !== 0) continue;
        ++count;
        for (let j = i + i; j < n; j += i) {
            arr[Math.floor(j / 32)] |= 1 << (j & 31);
        }
    }
    return count;
}

test('Primes less than 14', () => {
    const primes = filterOutCompositeNumbers(generateArrWithUpperLimit(14));
    expect(primes).toEqual([2, 3, 5, 7, 11, 13]);
});


/**
 * *2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101*
 * *103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197*
 * *199 211 223 227 229 233 239 241 251 257 263 269 271 277 281 283 293 307 311*
 * *313 317 331 337 347 349 353 359 367 373 379 383 389 397 401 409 419 421 431*
 * *433 439 443 449 457 461 463 467 479 487 491 499 503 509 521 523 541 547 557*
 * *563 569 571 577 587 593 599 601 607 613 617 619 631 641 643 647 653 659 661*
 * *673 677 683 691 701 709 719 727 733*
 */