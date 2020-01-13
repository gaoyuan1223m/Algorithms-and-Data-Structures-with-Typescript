import { IListBase } from "@Interface/common";

export interface IQueue<T> extends IListBase<T> {

    /**
     * *Enqueue an object or a sequence of objects to the tail of this Queue*
     * @param values: Object(s) that needs to add at the tail of this Queue 
     */
    enqueue(...values: T[]): this;

    /**
     * *Dequeue object(s) from the Head of this Queue*
     * @return {T | T[]} element or elements in Array 
     */
    dequeue(): T;
    /** 
     * @param n: the number of Objects that needs to removing from this Queue;
     */
    dequeue(n: number): T[];

}

