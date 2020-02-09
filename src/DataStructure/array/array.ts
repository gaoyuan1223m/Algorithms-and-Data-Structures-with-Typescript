import { IArray, IArrayConstructor } from "@Interface/specific";
import { IFactory } from "@Interface/common";
import { AbstractArray } from "@Entity/abstract/abstract-array";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";
import { ArrayTypes } from "@Utils/types";
import { Validation, ValidateParams } from "@Utils/decorator";


class Factory implements IFactory {

    create<T>(type: ArrayTypes, compare: ICompareFunc<T> = valueTypeComparison, capacity: number = 7, incremental: number = capacity): IArray<T> {

        if (!type || type === ArrayTypes.STATIC || incremental === 0) {
            return new StaticArray<T>(capacity, compare);
        }

        if (type === ArrayTypes.DYNAMIC) {
            return new DynamicArray<T>(capacity, compare, incremental);
        }

        throw new Errors.InvalidDataType(Errors.Msg.InvalidDataType);
    }

}

class SA<T> extends AbstractArray<T> {

    constructor(capacity: number, compare: ICompareFunc<T>) {
        super(capacity, compare, 0)
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
            if (this._isValidValue(this[i])) continue;
            tempIdx = i;
            break;
        }

        if (!tempIdx) { // in case no more room for the new value on it's right, we search it's left part 
            for (let i = idx - 1; i >= 0; i--) {
                if (this._isValidValue(this[i])) continue;
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
        const newStaticArray: IArray<U> = new StaticArray<U>(capacity, ICompareFunc);
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

class DA<T> extends AbstractArray<T> {

    constructor(capacity: number, compare: ICompareFunc<T>, incremental: number = capacity) {
        super(capacity, compare, incremental);
    }

    @Validation('value')
    append(@ValidateParams() value: T): this {
        if (this._idxOfLastElm + 1 === this._capacity) {
            this._grow();
        }

        this[this._idxOfLastElm + 1] = value;
        this[this._idxOfLastElm + 1 - this._capacity] = value;
        this._size += 1;
        this._idxOfLastElm += 1;
        return this;
    }

    @Validation()
    insertByIndex(@ValidateParams() value: T, @ValidateParams() index: number): this {
        const idx = this._getDynamicValidIndex(index);

        if (!this._isValidValue(this[idx])) {
            this._idxOfLastElm = this._getIdxOfLastElm(idx);
            this[idx] = value;
            this[idx - this._capacity] = value;
            this._size += 1;
            return this;
        }
        let tempIdx: number; // the empty position cloest to the idx on the right

        for (let i = idx + 1; i < this._capacity; i++) {
            if (this._isValidValue(this[i])) continue;
            tempIdx = i;
            break;
        }

        if (!tempIdx) { // in case no more room for the new value on it's right, we search it's left part 
            for (let i = idx - 1; i >= 0; i--) {
                if (this._isValidValue(this[i])) continue;
                tempIdx = i;
                break;
            }
        }

        if (!tempIdx && tempIdx !== 0) {
            this._grow();

            for (let i = this._idxOfLastElm; i >= idx; i--) {
                this[i + 1] = this[i];
            }

            this[idx] = value;

            for (let j = this._idxOfLastElm - this._capacity; j >= idx - this._capacity; j--) {
                this[j + 1] = this[j];
            }

            this[idx - this._capacity] = value;

            this._size += 1;
            this._idxOfLastElm += 1;
            return this;
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

    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc: ICompareFunc<U> = valueTypeComparison, thisArg?: any): IArray<U> {
        throw new Error("Method not implemented.");
    }

    private _getDynamicValidIndex(index: number): number {

        if (index >= 2 * this._capacity || index + 2 * this._capacity < 0) {
            throw new Errors.OutOfBoundary(Errors.Msg.BeyondBoundary);
        }

        if (index + this._capacity < 0 || index >= this._capacity) {
            this._grow();
            return index < 0 ? index + this._capacity : index;
        }

        if (index < 0) {
            return index + this._capacity;
        }

        return index;
    }

    private _grow(): void {
        for (let i = -1; i >= 0 - this._capacity; i--) {
            this[i] = undefined;
        }

        this._capacity += this._incrementals; // grow

        for (let i = 0; i <= this._idxOfLastElm; i++) {
            this[i - this._capacity] = this[i];
        }
    }

    private _getIdxOfLastElm(index: number): number {
        return index > this._idxOfLastElm ? index : this._idxOfLastElm;
    }

}


const StaticArray: IArrayConstructor = SA;
const DynamicArray: IArrayConstructor = DA; // in order to apply decorator

export const ArrayFactory = new Factory();