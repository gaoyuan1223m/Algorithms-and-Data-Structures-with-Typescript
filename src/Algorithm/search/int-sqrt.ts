import { Errors } from "@Utils/error-handling";

/**
 * @二分搜索
 *   数字第一次出现的位置（R = M）
 *   数字最后一次出现的位置 （L = M)
 * @数组三问
 *      1. sorted?
 *      2. duplicated?
 *      3. negative?
 */

/**
 * @SQRT_TO_Integer
 */

export const mySqrt = (n: number): number => {

    if (!n && n !== 0) {
        throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
    }

    if (n > Number.MAX_SAFE_INTEGER || n < Number.MIN_SAFE_INTEGER) {
        throw new Errors.InvalidArgument(Errors.Msg.NotSafeNum);
    }

    if (n < 0) {
        throw new Errors.InvalidArgument(Errors.Msg.NotPositiveInteger)
    }

    if (n === 0) return 0;

    n = Math.floor(n);

    let left = 1, right = n;

    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        let quotient = Math.floor(n / mid)
        if (mid === quotient) return mid;

        if (mid < quotient) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }

    }
    return right;
}

