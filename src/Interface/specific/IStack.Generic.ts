import { IGenericCollection } from "../common/ICollection";

export interface IStack<T> extends IGenericCollection<T> {
    push(value: T): void;
    pop(): T;
}
