import { ICollection } from "@Interface/common/ICollection";

export interface IQueue<T> extends ICollection<T> {

    enqueue(value: T): this;

    dequeue(): T;

}
