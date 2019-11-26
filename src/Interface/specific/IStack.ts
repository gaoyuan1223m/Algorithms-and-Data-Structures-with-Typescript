import { IGroup } from "@Interface/common/IGroup";
import { IArray } from "./IArray";
import { ILinkedList } from "./ILinkedList";

export interface IStack<T> extends IGroup {

    /**
     * Looks at the object at the top of this Stack without removing it from the Stack.
     */
    readonly peek: T;

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
     * @return 
     *      *the based position from the top of the stack where*
     *      *the object is located; the return value -1*
     *      *indicates that the object is not on the stack*.
     * @param {T} value: the desired object 
     */
    search(value: T): number;

    /**
     * *Convert current Stack to Static-Array*
     */
    toArray(): IArray<T>;

    /**
     * *Convert currect Stack to Dynamic-Array*
     */
    toArrayList(): IArray<T>;

    /**
     * *Convert current Stack to LinkedList*
     */
    toList(): ILinkedList<T>;
}
