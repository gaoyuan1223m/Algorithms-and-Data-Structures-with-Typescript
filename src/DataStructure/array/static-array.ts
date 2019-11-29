import { IArray, IArrayConstructor } from "@Interface/specific/IArray";
import { Console } from "@Utils/high-light";
import { Errors } from "@Utils/Errors";
import { IEqualsFunction, defaultEquals } from "@Utils/comparison";
import { ILinkedList } from "@Interface/specific/ILinkedList";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/data-types";
import { ITree } from "@Interface/specific/ITree";

export const StaticArray: IArrayConstructor = class StaticArray<T> implements IArray<T> {
   
    toArray(arrayType: ArrayTypes): IArray<T> {
        throw new Error("Method not implemented.");
    }
    toList(listType: ListTypes): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }
    toTree(treeType: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

    [n: number]: T;

    private _size: number;
    private _capacity: number;
    private _idxOfLastElm: number;

    constructor(
        capacity: number,
        protected equalsFunctions: IEqualsFunction<T> = defaultEquals
    ) {
        this._size = 0;
        this._idxOfLastElm = this._size;
        this._capacity = ~~(capacity < 0 ? 0 : capacity);
    }

    get size(): number {
        return this._size;
    };

    get length(): number {
        return this._capacity;
    };

    // O(1)
    append = (value: T): this => {
        if (this._idxOfLastElm + 1 === this._capacity) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        this[this._idxOfLastElm + 1] = value;
        this[this._idxOfLastElm + 1 - this._capacity] = value;
        this._size += 1;
        this._idxOfLastElm += 1;
        return this;
    }

    // O(1)
    getByIndex = (index: number): T => {
        return this[this._getValidIndex(index)];
    }

    // O(n)
    insertByIndex = (value: T, index: number): this => {
        const idx = this._getValidIndex(index);

        if (!this[idx]) {
            this._idxOfLastElm = this._getIdxOfLastElm(idx);
            this[idx] = value;
            this[idx - this._capacity] = value;
            this._size += 1;
            return this;
        }

        let tempIdx: number; // the cloest empty position to the idx on the right

        for (let i = idx + 1; i < this._capacity; i++) {
            if (this[i]) continue;
            tempIdx = i;
            break;
        }

        if (!tempIdx) { // in case no more room for the new value on it's right, we search it's left part 
            for (let i = idx - 1; i >= 0; i--) {
                if (this[i]) continue;
                tempIdx = i;
                break;
            }
        }

        if (tempIdx !== 0 && !tempIdx) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        if (tempIdx > idx) {
            this._idxOfLastElm = this._getIdxOfLastElm(tempIdx);

            for (let j = tempIdx; j > idx; j--) {
                this[j] = this[j - 1];
            }
            this[idx] = value;

            // for negative idx
            for (let k = tempIdx - this._capacity; k > idx - this._capacity; k--) {
                this[k] = this[k - 1];
            }
            this[idx - this._capacity] = value;

        } else {
            for (let j = tempIdx; j < idx; j++) {
                this[j] = this[j + 1];
            }
            this[idx] = value;

            // for negative idx
            for (let k = tempIdx - this._capacity; k < idx - this._capacity; k++) {
                this[k] = this[k + 1];
            }
            this[idx - this._capacity] = value;
        }

        this._size += 1;
        return this;
    }

    // O(1)
    updateByIndex(value: T, index: number): this {
        const idx = this._getValidIndex(index);
        this[idx] = value;
        this[idx - this._capacity] = value;
        return this;
    }

    // O(n)
    removeByIndex(index: number): this {
        const idx = this._getValidIndex(index);
        const value = this[idx];

        for (let i = idx + 1; i <= this._idxOfLastElm; i++) {
            this[i - 1] = this[i];
        }

        for (let k = idx + 1 - this._capacity; k <= this._idxOfLastElm - this._capacity; k++) {
            this[k - 1] = this[k];
        }

        this[this._idxOfLastElm] = undefined;
        this[this._idxOfLastElm - this._capacity] = undefined;

        while (!this[this._idxOfLastElm]) {
            this._idxOfLastElm -= 1;
        } // need to refactor!!!

        return this;
    }

    // O(n)
    remove(value: T): this {
        const idx = this.indexOf(value);
        if (idx === -1) return this;

        this.removeByIndex(idx);
        return this;
    }

    // O(n)
    contains(value: T): boolean {
        return this.indexOf(value) !== -1;
    }

    // O(n)
    indexOf(value: T): number {
        if (!value) return -1;

        for (let i = 0; i < this._capacity; i++) {
            if (this.equalsFunctions(this[i], value)) {
                return i
            }
        }

        return -1;
    };

    reverse(): this {
        let i = 0, j = this._capacity - 1;
        let ii = i - this._capacity, jj = -1;
        while (i < j) {
            let temp = this[j];
            this[i] = this[j];
            this[j] = temp;

            temp = this[jj];
            this[ii] = this[jj];
            this[jj] = temp;

            i += 1;
            j -= 1;
            ii += 1;
            jj -= 1;
        }

        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    // O(n)
    print(): this {
        let str = "["
        for (let i = 0; i < this._capacity; i++) {
            str += ` ${this[i]} `;
        }
        str = `${str}]`;
        Console.OK(str);
        return this;
    }

    // O(n)
    clear(): this {
        for (let i = 0; i < this._capacity; i++) {
            this[i] = undefined;
        }
        this._size = 0;
        return this;
    }

    // O(n)
    forEach(callbackfn: (value: T, index: number, current: IArray<T>) => void, thisArg?: any): void {
        const capacity = this._capacity;
        for (let idx = 0; idx < capacity; idx++) {
            callbackfn(this[idx], idx, this);
        }
    }

    // O(n)
    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, thisArg?: any): IArray<U> {
        const capacity = this._capacity;
        const newStaticArray: IArray<U> = new StaticArray<U>(capacity);
        for (let idx = 0; idx < capacity; idx++) {
            newStaticArray[idx] = callbackfn(this[idx], idx, this);
            newStaticArray[idx - capacity] = newStaticArray[idx];
        }
        return newStaticArray;
    }

   
    
    private _toStaticArray(): IArray<T> {
        return this;
    }
    private _toDynamicArray(): IArray<T> {
        return this;
    }

    private _getValidIndex(index: number): number {
        if (!index && index !== 0) { // bug: passing 0 will throw exception
            throw new Errors.InvalidIndex(Errors.Msg.InValidArg);
        }

        if (!Number.isInteger(index)) {
            throw new Errors.InvalidIndex(Errors.Msg.InValidIdx);
        }

        if (index >= this._capacity || index + this._capacity < 0) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        if (index < 0) {
            index += this._capacity;
        }

        return index;
    }

    private _getIdxOfLastElm(index: number): number {
        return index > this._idxOfLastElm ? index : this._idxOfLastElm;
    }

}