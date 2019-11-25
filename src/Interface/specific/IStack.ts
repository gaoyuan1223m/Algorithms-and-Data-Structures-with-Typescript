import { IGroup } from "@Interface/common/IGroup";
import { IArray } from "./IArray";
import { ILinkedList } from "./ILinkedList";

export interface IStack<T> extends IGroup {
    
    /**
     * Looks at the object at the top of this Stack without removing it from the Stack.
     */
    readonly peek :T;

    /**
     * Pushes an item onto the top of this Stack.
     * @param value: Object that needs to add at the top of this Stack
     */
    push(value: T): this;

    /**
     * Removes the object at the top of this Stack and returns that object as the value of this function.
     */
    pop(): T;

    search(value: T): number;

    toArray(): IArray<T>;

    toList(): ILinkedList<T>;
}
