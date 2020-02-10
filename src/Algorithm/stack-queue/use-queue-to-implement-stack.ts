import { IStack } from "@Interface/specific";


export class StackBy2Queue<T> implements IStack<T> {

    
    peek: T; 
    size: number;   
    
    push(...values: T[]): this {
        throw new Error("Method not implemented.");
    }

    pop(): T;
    pop(n: number): T[];
    pop(n?: any) : any{
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }

    print(): this {
        throw new Error("Method not implemented.");
    }

    clear(): this {
        throw new Error("Method not implemented.");
    }

}