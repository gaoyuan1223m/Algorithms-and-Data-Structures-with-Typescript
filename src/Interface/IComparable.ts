export interface IComparable {
    readonly value: number | string | Object;
    isEqualTo(value: number | string | Object): boolean;
    isLessThan(value: number | string | Object): boolean;
    isGreaterThan(value: number | string | Object): boolean;
}

export interface IGenericComparable<T> {
    isEqualTo(value: T): boolean;
    isLessThan(value: T): boolean;
    isGreaterThan(value: T): boolean;
}