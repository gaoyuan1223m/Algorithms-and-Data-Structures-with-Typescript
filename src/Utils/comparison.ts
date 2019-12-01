import { IComparable } from "@Interface/common/IComparable";


export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export function defaultEquals<T>(a: T, b: T): boolean {
    return a === b;
}

export type ICompareFunction<T> = (a: T, b: T) => ComparisonResult;

export function defaultCompare<T>(a: T, b: T): ComparisonResult {
    if (a === b) return ComparisonResult.EQUALS_TO;

    return a < b ? ComparisonResult.LESS_THAN : ComparisonResult.LARGER_THAN;
}

export function objectCompare<T extends IComparable<T>>(a: T, b: T): ComparisonResult {
    return a.compareWith(b);
}

export const NOT_EXISTED = -1;

export enum ComparisonResult {
    LESS_THAN = -1,
    LARGER_THAN = 1,
    EQUALS_TO = 0
}

export function isEqual(result: ComparisonResult): boolean {
    return result === ComparisonResult.EQUALS_TO;
}

export function isLarger(result: ComparisonResult): boolean {
    return result === ComparisonResult.LARGER_THAN;
}

export function isEqualOrLarger(result: ComparisonResult): boolean {
    return result === ComparisonResult.EQUALS_TO || result === ComparisonResult.LARGER_THAN;
}

export function isLess(result: ComparisonResult): boolean {
    return result === ComparisonResult.LESS_THAN;
}

export function isEqualOrLess(result: ComparisonResult): boolean {
    return result === ComparisonResult.EQUALS_TO || result === ComparisonResult.LESS_THAN;
}


export type ICompareFunc<T> = (a: T, b: T) => () => boolean;
export function defaultComparison<T>(a: T, b: T) {
    const isEqualTo = () => a === b;
    const isLargerThan = () => a > b;
    const isLessThan = () => a < b;
    const isLargerOrEqualTo = () => a >= b;
    const isLessOrEqualTo = () => a < b;
    return {
        isEqualTo,
        isLargerThan,
        isLargerOrEqualTo,
        isLessThan,
        isLessOrEqualTo
    }

}
