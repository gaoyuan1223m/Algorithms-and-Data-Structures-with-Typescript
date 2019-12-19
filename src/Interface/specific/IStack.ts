import { IArrayConstructor } from "@Interface/specific/IArray";
import { ILinkedListConstructor } from "@Interface/specific/ILinkedList";
import { ICompareFunc } from "@Utils/compare/comparison";

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

export interface IArrayStackConstructor {
    new <T>(capacity?: number, incrementals?: number): IStack<T>;
}

export interface ILinkedListStackConstructor {
    new <T>(ctor: ILinkedListConstructor): IStack<T>;
}
