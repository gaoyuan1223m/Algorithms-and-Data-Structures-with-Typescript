import { IStack, IQueue } from "@Interface/specific";
import { Queue } from "@DataStructure/stack-queue";


export class StackBy2Queues<T> implements IStack<T> {

    protected _queue1: IQueue<T>;
    protected _queue2: IQueue<T>;

    constructor() {
        this._queue1 = new Queue<T>();
        this._queue2 = new Queue<T>();
    }

    get peek(): T {
        return this._queue1.tail;
    } 

    get size(): number {
        return this._queue1.size;
    };   
    
    push(...values: T[]): this {
        this._queue1.enqueue(...values);
        return this;
    }

    pop(): T;
    pop(n: number): T[];
    pop(n?: any) : any{
        if(this._queue1.isEmpty()){
            return null;
        }

        if(!n) {
            this._queue2.enqueue(...this._queue1.dequeue(this._queue1.size - 1));
            return this._queue1.dequeue();
        }
    }

    isEmpty(): boolean {
        return this._queue1.isEmpty();
    }

    print(): this {
        return this;
    }

    clear(): this {
        this._queue1.clear();
        this._queue2.clear();
        return this;
    }

}