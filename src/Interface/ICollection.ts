import { IComparable } from "./IComparable";

export interface ICollection<T extends IComparable<T>> {
    readonly size: number;

    contains(value: T): boolean;

    add(value: T): this;

    remove(value: T): this;

    isEmpty():boolean;

    print(): void;

    clear(): void;
}