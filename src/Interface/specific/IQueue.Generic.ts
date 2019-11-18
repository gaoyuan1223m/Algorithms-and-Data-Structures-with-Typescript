import { ICollection } from "@Interface/common/ICollection.Generic";

export interface IQueue<T> extends ICollection<T> {

    enqueue(value: T): this;

    dequeue(): T;

}
