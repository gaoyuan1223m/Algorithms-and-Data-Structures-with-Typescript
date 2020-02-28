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
        if (this._queue1.isEmpty()) return this._queue2.tail;

        return this._queue1.tail;
    }

    get size(): number {
        return this._queue1.size || this._queue2.size;
    };

    push(...values: T[]): this {
        if (this._queue1.isEmpty()) {
            this._queue2.enqueue(...values);
        } else {
            this._queue1.enqueue(...values);
        }
        return this;
    }

    pop(): T;
    pop(n: number): T[];
    pop(n?: any): any {
        if (this._queue1.isEmpty() && this._queue2.isEmpty()) {
            return null;
        }

        if (!n) {
            if (this._queue1.isEmpty()) {

                if(this._queue2.size === 1) return this._queue2.dequeue()

                this._queue1.enqueue(...this._queue2.dequeue(this._queue2.size - 1));
                return this._queue2.dequeue();
            }

            if(this._queue1.size === 1) return this._queue1.dequeue()

            this._queue2.enqueue(...this._queue1.dequeue(this._queue1.size - 1));
            return this._queue1.dequeue();
        }

        n = Math.min(n, this.size);

        if (this._queue1.isEmpty()) {

            if((this.size - n) === 0){
                return this._queue2.dequeue(n).reverse();
            }

            this._queue1.enqueue(...this._queue2.dequeue(this._queue2.size - n));
            return this._queue2.dequeue(n).reverse();
        }

        if((this.size - n) === 0){
            return this._queue1.dequeue(n).reverse();
        }

        this._queue2.enqueue(...this._queue1.dequeue(this._queue1.size - n));
        return this._queue1.dequeue(n).reverse();
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