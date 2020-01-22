import { IHeap } from "@Interface/specific/IHeap";
import { ICompareFunc } from "@Utils/compare";
import { Console } from "@Utils/emphasize";
import { Errors } from "@Utils/error-handling";

interface ISimpleArray<T> {
    [index: number]: T
}

export abstract class AbstractHeap<T> implements IHeap<T> {

    abstract add(value: T): this;
    abstract removePeak(): T;
    abstract replacePeakBy(value: T): T;

    protected _elements: ISimpleArray<T>;
    protected _size: number

    get peak(): T {
        return this._elements[0];
    }

    protected get tail(): T {
        return this._elements[this._size - 1];
    }

    get size(): number {
        return this._size;
    }

    constructor(protected compare: ICompareFunc<T>) {
        this.__init__();
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): this {
        return this._print();
    }

    clear(): this {
        return this.__init__();
    }

    protected _removeFromTail(): T {
        const elem = this.tail;

        if(!this._isValidValue(elem)) return null;

        delete this._elements[--this._size];
        return elem;
    }

    protected _addAtTail(value: T): number {
        if(!this._isValidValue(value)){
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }
        this._elements[this._size++] = value;
        return this._size - 1;
    }

    protected _addAtPeak(value: T): this {        
        if(!this._isValidValue(value)){
            throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
        }
        
        if (this.isEmpty()) {
            this._size += 1;
        }
        this._elements[0] = value;
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
        return 2 * parentIndex + 1 <= this._size - 1;
    }

    protected _hasRightChild(parentIndex: number): boolean {
        return 2 * parentIndex + 2 <= this._size - 1;
    }

    protected _numOfParentNodes() {
        return Math.floor(this._size / 2);
    }

    private __init__(): this {
        this._size = 0;
        this._elements = {} as ISimpleArray<T>;
        return this;
    }

    private _print(): this {
        let str = "[ ";
        for (let i = 0; i < this._size; i++) {
            str += `${this._elements[i]}`;
            if (i === this._size - 1) break;
            str += `, `;
        }
        str += ` ]`;
        Console.Warn(str);
        return this;
    }

    protected _isValidValue(value: T) {
        return value !== undefined
            && value !== null
            && Number(value) !== NaN
            && Number(value) !== Infinity
            && String(value) !== "";
    }

}