import { IQueue, IQueueConstructor } from "@Interface/specific/IQueue";
import { DataStructures, ArrayTypes } from "@Utils/types/data-types";

export const Queue: IQueueConstructor = class Queue<T> implements IQueue<T> {
    
    peek: T;    
    
    size: number;

    enqueue(value: T): this {
        throw new Error("Method not implemented.");
    }

    dequeue(): T {
        throw new Error("Method not implemented.");
    }

    constructor(type: DataStructures, capacity?: number) {
        
    }

}

