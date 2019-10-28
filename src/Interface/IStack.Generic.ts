import { IGenericCollection } from "./ICollection";

export interface IStack<T> extends IGenericCollection<T> {
    push(value: T): void;
    pop(): T;
}
