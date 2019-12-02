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

export function isLargerOrEqual(result: ComparisonResult): boolean {
    return result === ComparisonResult.LARGER_THAN || result === ComparisonResult.EQUALS_TO;
}

export function isLess(result: ComparisonResult): boolean {
    return result === ComparisonResult.LESS_THAN;
}

export function isLessOrEqual(result: ComparisonResult): boolean {
    return result === ComparisonResult.LESS_THAN || result === ComparisonResult.EQUALS_TO;
}


export interface IComparisonKeys<T> {
    isEqualTo: (value2: T) => boolean
    isLargerThan: (value2: T) => boolean
    isLargerOrEqualTo: (value2: T) => boolean
    isLessThan: (value2: T) => boolean
    isLessOrEqualTo: (value2: T) => boolean
}

export type ICompareFunc<T> = (value1: T) => IComparisonKeys<T>;

export function valueTypeComparison<T>(value1: T): IComparisonKeys<T> {
    return {
        isEqualTo: (value2: T) => value1 === value2,
        isLargerThan: (value2: T) => value1 > value2,
        isLargerOrEqualTo: (value2: T) => value1 >= value2,
        isLessThan: (value2: T) => value1 < value2,
        isLessOrEqualTo: (value2: T) => value1 <= value2
    }
}

const func: ICompareFunc<number> = valueTypeComparison
console.log(func(4).isLargerOrEqualTo(2))

export function referenceTypeComparison<T extends IComparable<T>>(value1: T): IComparisonKeys<T> {
    return {
        isEqualTo: (value2: T) => isEqual(value1.compareWith(value2)),
        isLargerThan: (value2: T) => isLarger(value1.compareWith(value2)),
        isLargerOrEqualTo: (value2: T) => isLargerOrEqual(value1.compareWith(value2)),
        isLessThan: (value2: T) => isLess(value1.compareWith(value2)),
        isLessOrEqualTo: (value2: T) => isLessOrEqual(value1.compareWith(value2))
    }
}
