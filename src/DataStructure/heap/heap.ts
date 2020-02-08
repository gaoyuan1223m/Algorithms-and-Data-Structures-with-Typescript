
import { AbstractHeap } from "@Entity/abstract/abstract-heap";
import { IHeapConstructor, IHeap } from "@Interface/specific";
import { valueTypeComparison, ICompareFunc } from "@Utils/compare";
import { IFactory } from "@Interface/common";
import { BinaryHeapTypes } from "@Utils/types";
import { Errors } from "@Utils/error-handling";

class Factory implements IFactory {

    create<T>(type: BinaryHeapTypes, compare: ICompareFunc<T> = valueTypeComparison): IHeap<T> {
        if (type === BinaryHeapTypes.MAX) return new MaxBinaryHeap<T>(compare);

        if (type === BinaryHeapTypes.MIN) return new MinBinaryHeap<T>(compare); //need to revised

        throw new Errors.InvalidDataType(Errors.Msg.InvalidDataType);
    }
}
/**
 * @MaxBinaryHeap
 */
class MaxBH<T> extends AbstractHeap<T> {

    private readonly fn = (parent: T, child: T) => this.compare(parent).isLargerOrEqualTo(child);

    constructor(protected compare: ICompareFunc<T>) {
        super(compare);
    }

    add(value: T): this {
        const newElementIndex = this._addAtTail(value);
        return this._siftUp(newElementIndex, this.fn);
    }

    removePeak(): T {
        const peak = this.peak;
        if (!this._isValidValue(peak)) return peak;

        const tail = this._removeFromTail();
        if (this.isEmpty()) return peak;

        this._addAtPeak(tail);
        this._siftDown(0, this.fn);

        return peak;
    }

    replacePeakBy(value: T): T {
        const peak = this.peak;

        this._addAtPeak(value);

        if (!this._isValidValue(peak) || this._size === 1) return peak;

        this._siftDown(0, this.fn);

        return peak;
    }

}

class MinBH<T> extends AbstractHeap<T> {

    private readonly fn = (parent: T, child: T) => this.compare(parent).isLessOrEqualTo(child);

    constructor(protected compare: ICompareFunc<T>) {
        super(compare);
    }

    add(value: T): this {
        const newElementIndex = this._addAtTail(value);
        return this._siftUp(newElementIndex, this.fn);
    }

    removePeak(): T {
        const peak = this.peak;
        if (!this._isValidValue(peak)) return peak;

        const tail = this._removeFromTail();
        if (this.isEmpty()) return peak;

        this._addAtPeak(tail);
        this._siftDown(0, this.fn);

        return peak;
    }

    replacePeakBy(value: T): T {
        const peak = this.peak;

        this._addAtPeak(value);

        if (!this._isValidValue(peak) || this._size === 1) return peak;

        this._siftDown(0, this.fn);

        return peak;
    }

}

const MaxBinaryHeap: IHeapConstructor = MaxBH
const MinBinaryHeap: IHeapConstructor = MinBH

export const HeapFactory = new Factory();