import { IQueue, IArrayLike } from "@Interface/specific";
import { Errors } from "@Utils/error-handling";
import { Console } from "@Utils/emphasize";

/**Implement Circular Queue by Array */
export class CircularQueue<T> implements IQueue<T> {

    private readonly INITIAL_CAPACITY = 10;
    private readonly GROW_CAPACITY = this.INITIAL_CAPACITY / 2;

    private _array: IArrayLike<T>;

    protected _size: number;
    protected _headIdx: number;
    protected _tailIdx: number;
    protected _capacity: number

    constructor(capacity?: number) {
        this.__init__();
        this._array = {};
        this._capacity = capacity || this.INITIAL_CAPACITY;
    }

    get size(): number {
        return this._size;
    }

    get head(): T {
        return this._array[this._headIdx];
    }

    get tail(): T {
        return this._array[this._tailIdx];
    }

    enqueue(...values: T[]): this {

        // _tailIdx >= _headIdx 

        for (const value of values) {

            if (!this._isValid(value)) continue;

            if (this._size === this._capacity) {
                // grow _array;
            }

            if (this._tailIdx === this._capacity - 1) {
                this._tailIdx = -1;
            }

            this._array[++this._tailIdx] = value;

            this._size += 1;
        }

        return this;
    }

    dequeue(): T;
    dequeue(n: number): T[];
    dequeue(n?: any): any {
        if (n <= 0 || !Number.isSafeInteger(n)) {
            throw new Errors.InvalidArgument(Errors.Msg.NotSafeInteger)
        }

        if(n > this._capacity) {
            throw new Errors.InvalidArgument(Errors.Msg.BeyondCapacity);
        }

        if (this.isEmpty()) {
            return null;
        }

        if(!n) {
            const value = this._array[this._headIdx];

            if(this._headIdx === this._tailIdx) {
                this.__init__();
                return value;
            }

            delete this._array[this._headIdx++];
            return value;
        }


    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): this {
        let printStr = "";
        if (this.isEmpty()) {
            Console.OK(`[${printStr} ]`);
            return this;
        }

        if (this._headIdx <= this._tailIdx) {
            for (let i = this._headIdx; i <= this._tailIdx; i++) {
                printStr += `${this._array[i]}, `
            }
            Console.OK(`[${printStr} ]`);
            return this;
        }

        for (let j = 0; j < this._capacity; j++) {
            printStr += `${this._array[j]}, `
        }
        for (let k = 0; k <= this._tailIdx; k++) {
            printStr += `${this._array[k]}, `
        }
        Console.OK(`[${printStr} ]`);
        return this;
    }

    clear(): this {
        return this.__init__();
    }

    private __init__(): this {
        this._size = 0;
        this._headIdx = -1;
        this._tailIdx = -1;
        this._array = {};
        return this;
    }

    private _isValid(value: T): boolean {
        return !!value && isFinite(Number(value)) || Number(value) === 0 && value !== null && String(value) !== "";
    }

}