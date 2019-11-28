import { IStack, IStackConstructor } from "@Interface/specific/IStack";
import { DataStructures } from "@Utils/data-types";

export const Stack: IStackConstructor = class Stack<T> implements IStack<T> {
    
    peek: T;    
    
    size: number;

    push(value: T): this {
        throw new Error("Method not implemented.");
    }

    pop(): T {
        throw new Error("Method not implemented.");
    }

    constructor(type: DataStructures, capacity?: number) {
        
    }

}
