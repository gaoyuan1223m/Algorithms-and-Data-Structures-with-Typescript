import { IListBase } from "@Interface/common";

export interface IDeque<T> extends IListBase<T> {

    /**
     * *Add element(s) to the HEAD of this Deque*
     * @param values: element(s) that need(s) to add at the HEAD of this Deque 
     */
    unshift(...values: T[]): this;

    /**
     * *Add elements to the TAIL of this Deque*
     * @param values: Elements(s) that need(s) to add at the TAIL of this Deque   
     */
    push(...values: T[]): this;

    /**
     * *Remove element(s) from the HEAD of Deque and return*
     */
    shift(): T;
    /** 
     * @param n the number of element(s) that need(s) to remove from HEAD of this Deque 
     */
    shift(n: number): T[];

    /**
     * *Remove object(s) from the Tail of Deque and return*
     */
    pop(): T;
    /**
     * @param n the number of elements that needs to remove from the Tail of this Deque
     */
    pop(n: number): T[];

}
