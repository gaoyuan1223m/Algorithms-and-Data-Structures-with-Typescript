import { DataStructures } from "@Utils/types/data-types";

export interface IQueue<T> {

    /**
     * *Looks at the object at the head of this Queue without removing it from the Queue*.
     */
    readonly head: T;

    /**
     * *Looks at the object at the tail of this Queue without removing it from the Queue*.
     */
    readonly tail: T;

    /**
     * *The number of the object on the current Queue*.
     */
    readonly size: number;

    /**
     * *Enqueue an object or a sequence of objects to the tail of this Queue*
     * @param values: Object(s) that needs to add at the tail of this Queue 
     */
    enqueue(...values: T[]): this;

    /**
     * *Dequeue object(s) from the Head of this Queue*
     */
    dequeue(): T;
    /** 
     * @param n: the number of Objects that needs to removing from this Queue;
     */
    dequeue(n: number): T[];

    /**
     * *Whether current Queue contains any object, return a boolen value*
     */
    isEmpty(): boolean;

    /**
     * *Remove all objects from current Queue*
     */
    clear(): this;
}

