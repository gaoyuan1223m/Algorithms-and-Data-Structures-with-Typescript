
import { AbstractHeap } from "@Entity/abstract/abstract-heap";
import { IHeapConstructor, IHeap } from "@Interface/specific";
import { valueTypeComparison, ICompareFunc } from "@Utils/compare";
import { IFactory } from "@Interface/common";
import { BinaryHeapTypes } from "@Utils/types";
import { Errors } from "@Utils/error-handling";

class Factory implements IFactory {

    create<T>(type: BinaryHeapTypes, compare: ICompareFunc<T> = valueTypeComparison): IHeap<T> {
        if (type === BinaryHeapTypes.MAX) return new MaxBinaryHeap<T>(compare);

        if (type === BinaryHeapTypes.MIN) return new MaxBinaryHeap<T>(compare); //need to revised

        throw new Errors.InvalidDataType(Errors.Msg.InvalidDataType);
    }
}
/**
 * @MaxBinaryHeap
 */
class MaxBH<T> extends AbstractHeap<T> {

    constructor(protected compare: ICompareFunc<T>) {
        super(compare);
    }

    add(value: T): this {
        const newElementIndex = this._addAtTail(value);
        return this._siftUp(newElementIndex);
    }

    removePeak(): T {
        const peak = this.peak;
        if (!this._isValidValue(peak)) return peak;

        const tail = this._removeFromTail();
        if (this.isEmpty()) return peak;

        this._addAtPeak(tail);
        this._siftDown(0);

        return peak;
    }

    replacePeakBy(value: T): T {
        const peak = this.peak;

        this._addAtPeak(value);

        if (!this._isValidValue(peak) || this._size === 1) return peak;

        this._siftDown(0);

        return peak;
    }

    private _siftUp(index: number): this {
        const value = this._elements[index];
        while (this._hasParent(index)) {
            let parentIndex = this._getParentIdx(index);
            let parentValue = this._elements[parentIndex]

            if (this.compare(parentValue).isLargerOrEqualTo(value)) break;

            this._elements[index] = parentValue;
            index = parentIndex;
        }
        this._elements[index] = value;
        return this;
    }

    private _siftDown(index: number): void {
        const value = this._elements[index];
        while (this._hasChild(index)) {
            // must have left node
            let childIndex = this._getLeftChildIndex(index);
            let childValue = this._elements[childIndex];

            let rightIndex = childIndex + 1;

            // in case right node is large than the left one
            if (this._hasRightChild(index)
                && this.compare(this._elements[rightIndex]).isLargerThan(childValue)) {
                childValue = this._elements[childIndex = rightIndex];
            }

            if (this.compare(childValue).isLessThan(value)) break;

            this._elements[index] = childValue;
            index = childIndex;
        }

        this._elements[index] = value;
    }

}

const MaxBinaryHeap: IHeapConstructor = MaxBH

export const HeapFactory = new Factory();