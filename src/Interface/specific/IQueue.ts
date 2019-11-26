import { IGroup } from "@Interface/common/IGroup";

export interface IQueue<T> extends IGroup {

    /**
     * *Looks at the object at the head of this Queue without removing it from the Stack*.
     */
    readonly peek : T;

    /**
     * *Enqueue an object to the tail of this Queue*
     * @param value: Object that needs to add at the tail of this Queue 
     */
    enqueue(value: T): this;

    dequeue(): T;

}
