import { IListBase } from "@Interface/common";

export interface IDeque<T> extends IListBase<T> {
    /**
     * *Add element(s) to the HEAD*
     * @param values element(s) to add
     */
    unshift(...values: T[]): this;
    /**
     * *Add elements to the TAIL
     * @param values: elements(s) to add
     */
    push(...values: T[]): this;
    /**
     * *Remove element(s) from the HEAD and return element*
     */
    shift(): T;
    /**
     * @param n the number of element(s) to remove from HEAD
     */
    shift(n: number): T[];
    /**
     * *Remove element(s) from the Tail
     */
    pop(): T;
    /**
     * @param n the number of elements to remove from the Tail
     */
    pop(n: number): T[];

}
