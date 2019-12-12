import { DataStructures } from "@Utils/data-types";
import { IArrayConstructor } from "./IArray";
import { ILinkedListConstructor } from "./ILinkedList";
import { ICompareFunc } from "@Utils/comparison";

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
     * *Pushes an item onto the top of this Stack*.
     * @param value: Object that needs to add at the top of this Stack
     */
    push(value: T): this;

    /**
     * *Removes the object at the top of this Stack and returns that object as the value of this function*
     */
    pop(): T;

    /**
     * *Whether current Stack contains any object, return a boolen value*
     */
    isEmpty(): boolean;

    /**
     * *Remove all objects from current Stack*
     */
    clear(): this;

}

export interface IStackConstructor {

    new <T>(ctor: IArrayConstructor, capacity?: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): IStack<T>;

    new <T>(ctor: ILinkedListConstructor, ICompareFn?: ICompareFunc<T>): IStack<T>;

}
