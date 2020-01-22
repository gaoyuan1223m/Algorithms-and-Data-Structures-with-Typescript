import { IListBase } from "@Interface/common";

export interface IDeque<T> extends IListBase<T> {

    /**
     * *Add element(s) to the HEAD
     * @param values: element(s) that need(s) to add
     */
    unshift(...values: T[]): this;

    /**
     * *Add elements to the TAIL
     * @param values: Elements(s) that need(s) to add
     */
    push(...values: T[]): this;

    /**
     * *Remove element(s) from the HEAD element and return*
     */
    shift(): T;
    /** 
     * @param n the number of element(s) that need(s) to remove from HEAD 
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
