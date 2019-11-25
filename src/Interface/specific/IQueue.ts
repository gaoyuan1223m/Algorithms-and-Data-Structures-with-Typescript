import { IGroup } from "@Interface/common/IGroup";

export interface IQueue<T> extends IGroup {

    enqueue(value: T): this;

    dequeue(): T;

}
