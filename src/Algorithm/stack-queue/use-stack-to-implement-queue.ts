import { IQueue, IStack } from "@Interface/specific";
import { StackFactory } from "@DataStructure/stack-queue";

/**
 * use stack(s) to implement a queue
 */

export class QueueBy2Stacks<T> implements IQueue<T> {

    protected readonly _stackPush: IStack<T>;
    protected readonly _stackPop: IStack<T>;

    constructor() {
        this._stackPush = StackFactory.create<T>();
        this._stackPop = StackFactory.create<T>();
    }

    get size(): number {
        return this._stackPop.size;
    }

    get head(): T {
        return this._stackPop.peek;
    };

    get tail(): T {
        return null;
    };

    enqueue(...values: T[]): this {
        this._stackPush.push(...values);

        let oldValues: T[] = [];
        if (!this._stackPop.isEmpty()) {
            oldValues = this._stackPop.pop(this._stackPop.size).reverse();
        }

        let newValues = this._stackPush.pop(this._stackPush.size);

        this._stackPop.push(...newValues, ...oldValues);

        return this;
    }

    dequeue(): T;
    dequeue(n: number): T[];
    dequeue(n?: any): any {
        if(this._stackPop.isEmpty()) {
            return null;
        }

        return this._stackPop.pop(n);
    }


    isEmpty(): boolean {
        return this._stackPop.isEmpty();
    }

    print(): this {
        this._stackPop.print()
        return this;
    }

    clear(): this {
        this._stackPop.clear();
        this._stackPush.clear();
        return this;
    }

}
