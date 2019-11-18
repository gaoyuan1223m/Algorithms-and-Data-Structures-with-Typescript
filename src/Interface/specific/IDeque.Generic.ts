import { IStack } from "@Interface/specific/IStack.Generic";
import { IQueue } from "@Interface/specific/IQueue.Generic";


export interface IDeque<T> extends IStack<T>, IQueue<T> {

}