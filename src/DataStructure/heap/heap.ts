
import { AbstractHeap } from "@Entity/abstract/abstract-heap";
import { IHeapConstructor, IHeap } from "@Interface/specific";
import { valueTypeComparison, ICompareFunc } from "@Utils/compare";
import { IFactory } from "@Interface/common";
import { BinaryHeapTypes } from "@Utils/types";

class Factory implements IFactory {

    create<T>(capacity: number, compare?: ICompareFunc<T>): IHeap<T>;
    create<T>(capacity?: number, incremental?: number): IHeap<T>;
    create<T>(type?: BinaryHeapTypes, capacity?: number, incremental?: number): IHeap<T>;
    create<T>(type?: any, capacity?: any, incremental?: any, compare?: any): any {
        return new MaxBinaryHeap<T>(capacity, compare)
    }
}

const MaxBinaryHeap: IHeapConstructor = class Heap<T> extends AbstractHeap<T> {

    constructor(
        protected capacity: number = 15,
        protected compare: ICompareFunc<T> = valueTypeComparison
    ) {
        super(capacity, compare);
    }

    add(value: T): this {

        let newElementIndex = this._elements.size;

        this._elements.append(value);

        while (this._hasParent(newElementIndex)) {

            let parentIndex = this._getParentIdx(newElementIndex);
            let parentValue = this._elements[parentIndex]

            if (this.compare(parentValue).isLargerOrEqualTo(value)) break;

            this._elements[newElementIndex] = parentValue;
            newElementIndex = parentIndex;
        }

        this._elements[newElementIndex] = value

        return this;
    }

    removePeak(): T {

        const peak = this.peak;
        const tail = this._elements.removeByIndex(this.size - 1);

        if (this.isEmpty()) return peak;

        let currIndex = 0;
        while (this._hasChild(currIndex)) {

            // must have left node
            let childIndex = this._getLeftChildIndex(currIndex);
            let childValue = this._elements[childIndex];

            let rightIndex = childIndex + 1;
            
            // in case right node is large than the left one
            if (this._hasRightChild(currIndex)
                && this.compare(this._elements[rightIndex]).isLargerThan(childValue)) {
                    childValue = this._elements[childIndex = rightIndex];
            }

            if(this.compare(childValue).isLessThan(tail)) break;
            
            this._elements[currIndex] = childValue;
            currIndex = childIndex;
        }
        
        this._elements[currIndex] = tail;

        return peak;
    }

    replacePeakBy(value: T): this {
        throw new Error("Method not implemented.");
    }

}

export const HeapFactory = new Factory();