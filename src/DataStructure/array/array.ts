import { IArray, ILinkedList, ITree } from "@Interface/specific";
import { IFactory } from "@Interface/common";
import { AbstractArray } from "@Entity/abstract";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";
import { Validation, ValidateParams } from "@Utils/decorator";


class Factory implements IFactory {

    constructor() { }

    create<T>(type: ArrayTypes, capacity: number, incremental?: number): IArray<T> {
        if (type === ArrayTypes.Static || incremental === 0) {
            return new StaticArray<T>(capacity);
        }

        if (type === ArrayTypes.Dynamic) {
            return new DynamicArray(capacity, incremental);
        }

        throw new Errors.InvalidDataType(Errors.Msg.InvalidDataType);
    }

}

class StaticArray<T> extends AbstractArray<T> {

    constructor(capacity: number) {
        super(capacity, 0)
    }

    // O(1)
    @Validation('value')
    append(@ValidateParams() value: T): this {

        if (this._idxOfLastElm + 1 === this._capacity) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        this[this._idxOfLastElm + 1] = value;
        this[this._idxOfLastElm + 1 - this._capacity] = value;
        this._size += 1;
        this._idxOfLastElm += 1;
        return this;
    }

    // O(n)
    @Validation()
    insertByIndex(@ValidateParams() value: T, @ValidateParams() index: number): this {

        const idx = this._getValidIndex(index);

        if (!this._isValidValue(this[idx])) {
            this._idxOfLastElm = this._getIdxOfLastElm(idx);
            this[idx] = value;
            this[idx - this._capacity] = value;
            this._size += 1;
            return this;
        }

        let tempIdx: number; // the empty position cloest to the idx on the right

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

    // O(n)
    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): IArray<U> {
        const capacity = this._capacity;
        const newStaticArray: IArray<U> = new StaticArray<U>(capacity);
        for (let idx = 0; idx < capacity; idx++) {
            newStaticArray[idx] = callbackfn(this[idx], idx, this);
            newStaticArray[idx - capacity] = newStaticArray[idx];
        }
        return newStaticArray;
    }

    private _getIdxOfLastElm(index: number): number {
        return index > this._idxOfLastElm ? index : this._idxOfLastElm;
    }

}

/**@NOT Completed */
class DynamicArray<T> extends AbstractArray<T> {

    constructor(capacity: number, incremental: number = capacity) {
        super(capacity, incremental);
    }

    @Validation('value')
    append(@ValidateParams() value: T): this {
        throw new Error("Method not implemented.");
    }

    @Validation()
    insertByIndex(@ValidateParams() value: T, @ValidateParams() index: number): this {
        throw new Error("Method not implemented.");
    }

    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc: ICompareFunc<U> = valueTypeComparison, thisArg?: any): IArray<U> {
        throw new Error("Method not implemented.");
    }

}

export const ArrayFactory = new Factory();