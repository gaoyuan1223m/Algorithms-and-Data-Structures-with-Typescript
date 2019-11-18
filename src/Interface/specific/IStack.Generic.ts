import { ICollection } from "@Interface/common/ICollection.Generic";

export interface IStack<T> extends ICollection<T> {
    
    push(value: T): this;

    pop(): T;
}
