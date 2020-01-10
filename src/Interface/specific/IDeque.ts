
export interface IDeque<T> {

    /**
     * *Looks at the HEAD Element of this Deque without removing it from the Deque*.
     */
    readonly head: T;

    /**
     * *Looks at TAIl Element of this Deque without removing it from the Deque*.
     */
    readonly tail: T;

    /**
     * *Return the number of the elements on the current Deque*.
     */
    readonly size: number;

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

    /**
     * *Whether current Deque contains any object, return a boolen value*
     */
    isEmpty(): boolean;

    /**
     * *Remove all elements from current Deque*
     */
    clear(): this;
}
