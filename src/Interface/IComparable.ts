export interface IComparable<T> {
    isEqualTo(value: T): boolean;
    isLessThan(value: T): boolean;
    isGreaterThan(value: T): boolean;
}