import { IStack } from "@Interface/specific/IStack";
import { IQueue } from "@Interface/specific/IQueue";


export interface IDeque<T> extends IStack<T>, IQueue<T> {

}