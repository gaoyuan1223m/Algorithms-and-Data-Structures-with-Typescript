
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

            if (this.compare(parentValue).isLessThan(value)) {
                let temp = parentValue;
                this._elements[parentIndex] = value;
                this._elements[newElementIndex] = temp;

                this._elements[parentIndex - this.capacity] = value;
                this._elements[newElementIndex - this.capacity] = temp;

                newElementIndex = parentIndex;
                continue;
            }
            break;
        }

        return this;
    }

    removePeak(): this {
        throw new Error("Method not implemented.");
    }

    replacePeakBy(value: T): this {
        throw new Error("Method not implemented.");
    }

}

export const HeapFactory = new Factory();