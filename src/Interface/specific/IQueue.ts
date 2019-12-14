import { DataStructures } from "@Utils/types/data-types";

export interface IQueue<T> {

    /**
     * *Looks at the object at the head of this Queue without removing it from the Queue*.
     */
    readonly peek: T;

    /**
     * *The number of the object on the current Queue*.
     */
    readonly size: number;

    /**
     * *Enqueue an object to the tail of this Queue*
     * @param value: Object that needs to add at the tail of this Queue 
     */
    enqueue(value: T): this;

    /**
     * *Dequeue an object from the peek of this Queue*
     */
    dequeue(): T;

}

export interface IQueueConstructor {
    new <T>(type: DataStructures, capacity?: number): IQueue<T>;
}
