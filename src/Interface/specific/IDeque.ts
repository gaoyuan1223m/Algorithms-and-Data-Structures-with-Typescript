
export interface IDeque<T> {

    readonly head: T;

    readonly tail: T;

    readonly size: number;

    addAtHead(...value: T[]): this;

    addAtTail(...value: T[]): this;

    popFromHead(): T;

    popFromHead(n: number): T[];

    popFromTail(): T;

    popFromTail(n: number): T[];

    isEmpty(): boolean;

    clear(): this;
}
