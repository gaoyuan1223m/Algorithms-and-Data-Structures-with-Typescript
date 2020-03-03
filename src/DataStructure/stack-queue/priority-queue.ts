import { IQueue, IHeap } from "@Interface/specific";
import { HeapFactory } from "@DataStructure/heap";
import { BinaryHeapTypes } from "@Utils/types";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";


export class PriorityQueue<T> implements IQueue<T> {

    private _heap: IHeap<T>;

    get size(): number {
        return this._heap.size;
    }

    get head(): T {
        return this._heap.peak;
    };

    get tail(): T {
        return this._heap.tail;
    };

    constructor(compare: ICompareFunc<T> = valueTypeComparison) {
        this._heap = HeapFactory.create(BinaryHeapTypes.MAX, compare)
    }

    enqueue(...values: T[]): this {
        for (const val of values) {
            this._heap.add(val)
        }
        return this;
    }

    dequeue(): T;
    dequeue(n: number): T[];
    dequeue(n?: any): any {
        if(n === 0) {
            return null;
        }

        if(!n) {
            return this._heap.removePeak();
        }

        const res: T[] = [];

        n = ~~Math.min(n, this.size);

        for (let i = 0; i < n; i++) {
            res.push(this._heap.removePeak());            
        }

        return res;
    }

    isEmpty(): boolean {
        return this._heap.isEmpty();
    }

    print(): this {
        this._heap.print();
        return this;
    }

    clear(): this {
        this._heap.clear();
        return this;
    }

}