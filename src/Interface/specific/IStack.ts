import { ICollectionBase } from "@Interface/common";

export interface IStack<T> extends ICollectionBase {

    /**
     * @return top element of this Stack without removing it
     */
    readonly peek: T;

    /**
     * *Add elements onto the top of this Stack*.
     * @param values elements to add at the top of this Stack
     */
    push(...values: T[]): this;

    /**
     * *Removes element(s) from the top of this Stack*
     * @return {T | T[]} element or elements in Array 
     */
    pop(): T;
    /**
     * @param n the number of elements to remove
     */
    pop(n: number): T[];

}

