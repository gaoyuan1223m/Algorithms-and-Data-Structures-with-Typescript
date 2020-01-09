
export interface IDeque<T> {

    /**
     * *Looks at the object at the head of this Deque without removing it from the Deque*.
     */
    readonly head: T;

    /**
     * *Looks at the object at the tail of this Deque without removing it from the Deque*.
     */
    readonly tail: T;

    /**
     * *The number of the object on the current Deque*.
     */
    readonly size: number;

    /**
     * *Add an object or a sequence of objects to the Head of this Deque*
     * @param values: Object(s) that needs to add at the Head of this Deque 
     */
    addAtHead(...values: T[]): this;

    /**
     * *Add an object or a sequence of objects to the Tail of this Deque*
     * @param values: Object(s) that needs to add at the Tail of this Deque   
     */
    addAtTail(...values: T[]): this;

    /**
     * *Remove objects from the Head of Deque and return*
     */
    popFromHead(): T;
    /** 
     * @param n: the number of Objects that needs to removing from Head of this Deque 
     */
    popFromHead(n: number): T[];

    /**
     * *Remove object(s) from the Tail of Deque and return*
     */
    popFromTail(): T;
    popFromTail(n: number): T[];

    /**
     * *Whether current Deque contains any object, return a boolen value*
     */
    isEmpty(): boolean;

    /**
     * *Remove all objects from current Deque*
     */
    clear(): this;
}
