
export interface IStack<T> {

    /**
     * *Looks at the object at the top of this Stack without removing it from the Stack*
     */
    readonly peek: T;

    /**
     * *The number of the objects on the current Stack*
     */
    readonly size: number;

    /**
     * *Pushes objects onto the top of this Stack*.
     * @param values: Objects that need to add at the top of this Stack
     */
    push(...values: T[]): this;

    /**
     * *Removes object(s) at the top of this Stack and returns object or object array* 
     */
    pop(): T;
    /**
     * @param n: the number of objects that needs to remove
     */
    pop(n: number): T[];

    /**
     * *Whether current Stack contains any object, return a boolen value*
     */
    isEmpty(): boolean;

    /**
     * *Remove all objects from current Stack*
     */
    clear(): this;

}

export interface IArrayStackConstructor {
    new <T>(capacity?: number, incrementals?: number): IStack<T>;
}

export interface ILinkedListStackConstructor {
    new <T>(): IStack<T>;
}
