import { IStack, IStackConstructor } from "@Interface/specific/IStack";
import { DataStructures, ArrayTypes } from "@Utils/data-types";
import { IArray, IArrayConstructor } from "@Interface/specific/IArray";
import { StaticArray } from "@DataStructure/array/static-array";
import { DynamicArray } from "@DataStructure/array/dynamic-array";
import { Errors } from "@Utils/errors";
import { ILinkedListConstructor } from "@Interface/specific/ILinkedList";
import { ICompareFunc, valueTypeComparison } from "@Utils/comparison";

export const Stack: IStackConstructor = class Stack<T> implements IStack<T> {

    protected _size: number;
    protected _staticArray: IArray<T>;
    protected _dynamicArray: IArray<T>;

    get peek(): T {
        return this._staticArray[this._size - 1];
    }

    get size(): number {
        return this._size;
    };

    constructor(capacity: number = 10, private type: DataStructures = ArrayTypes.Static) {
        this._buildStack(capacity, type);
    }
   

    push(value: T): this {
        return this._pushValueToStack(value);
    }

    pop(): T {
        return this._popValueFromStack();
    }

    isEmpty(): boolean {
        return this._isCurrentStackEmpty();
    }

    clear(): this {
        return this._removeAllValuesFromStack();
    }


    protected _buildStack(capacity: number, type: DataStructures) {
        this._size = 0;
        switch (type) {
            case ArrayTypes.Static:
                this._staticArray = new StaticArray<T>(capacity);
                break;

            case ArrayTypes.Dynamic:
                this._dynamicArray = new DynamicArray<T>(capacity);
                break;

            default:
                this._staticArray = new StaticArray<T>(capacity);
                break;
        }
    }

    private _pushValueToStack(value: T): this {
        this._staticArray.append(value);
        this._size += 1;
        return this;
    }

    private _popValueFromStack(): T {
        if (this._isCurrentStackEmpty()) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoElements);
        }
        const value = this._staticArray[this._size - 1];
        this._staticArray.removeByIndex(this._size - 1);
        this._size -= 1;
        return value;
    }

    private _removeAllValuesFromStack(): this {
        this._staticArray.clear();
        this._size = 0;
        return this;
    }

    private _isCurrentStackEmpty() {
        return this._size === 0;
    }
}

export const StatcksFactory: IFactoryConstructor = class StacksFactory {

    static create<T>(): IStack<T> {
        throw new Error("Method not implemented.");
    }

}

export interface IFactoryConstructor {
    create(): any;
}