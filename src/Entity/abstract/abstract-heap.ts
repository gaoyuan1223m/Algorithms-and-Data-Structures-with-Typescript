import { IHeap } from "@Interface/specific/IHeap";
import { IArray } from "@Interface/specific";
import { ICompareFunc } from "@Utils/compare";
import { ArrayFactory } from "@DataStructure/array";
import { ArrayTypes, ListPrintOrder } from "@Utils/types";

export abstract class AbstractHeap<T> implements IHeap<T> {

    abstract add(value: T): this;
    abstract removePeak(): T;
    abstract replacePeakBy(value: T): this;

    protected _elements: IArray<T>;

    get peak(): T {
        return this._elements[0];
    }

    get size(): number {
        return this._elements.size;
    }

    constructor(protected capacity: number, protected compare: ICompareFunc<T>) {
        this._elements = ArrayFactory.create<T>(ArrayTypes.DYNAMIC, capacity);
    }

    isEmpty(): boolean {
        return this._elements.size === 0;
    }

    print(): this {
        this._elements.print(ListPrintOrder.FromHeadToTail);
        return this;
    }

    clear(): this {
        this._elements.clear();
        return this;
    }

    protected _hasParent(childIndex: number): boolean {
        return Math.floor((childIndex - 1) / 2) >= 0;
    }

    protected _getParentIdx(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    protected _hasChild(parentIndex: number): boolean {
        return parentIndex < this._numOfParentNodes();
    }

    protected _hasChildren(parentIndex: number): boolean {
        return this._hasleftChild(parentIndex) && this._hasRightChild(parentIndex);
    }

    protected _getLeftChildIndex(parentIndex: number): number {
        return this._hasleftChild(parentIndex) ? 2 * parentIndex + 1 : -1;
    }

    protected _getRightChildIndex(parentIndex: number): number {
        return this._hasRightChild(parentIndex) ? 2 * parentIndex + 2 : -1;
    }

    protected _hasleftChild(parentIndex: number): boolean {
        return 2 * parentIndex + 1 <= this._elements.size - 1;
    }

    protected _hasRightChild(parentIndex: number): boolean {
        return 2 * parentIndex + 2 <= this._elements.size - 1;
    }

    protected _numOfParentNodes() {
        return Math.floor(this._elements.size / 2);
    }

}