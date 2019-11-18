import { ICollection } from "@Interface/common/ICollection";

export interface IQueue extends ICollection {

    enqueue(value: number | string | boolean | Object): this;

    dequeue(): number | string | boolean | Object;

}
