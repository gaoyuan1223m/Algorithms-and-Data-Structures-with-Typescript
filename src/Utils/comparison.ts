import { IComparable } from "@Interface/common/IComparable.Generic";

export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export function defaultEquals<T>(a: T, b: T): boolean {
    return a === b;
}

export function objectEquals<T extends IComparable<T>>(a: T, b: T): boolean {
    return a.isEqualTo(b);
}