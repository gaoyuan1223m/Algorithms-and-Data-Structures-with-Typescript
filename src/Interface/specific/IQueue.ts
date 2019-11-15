import { IGenericCollection } from "../common/ICollection";

export interface IQueue<T> extends IGenericCollection<T> {

    enqueue(value: T): void

    dequeue(): T;

}