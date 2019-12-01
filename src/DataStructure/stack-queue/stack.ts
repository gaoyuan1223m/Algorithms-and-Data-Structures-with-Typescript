import { IStack, IStackConstructor } from "@Interface/specific/IStack";
import { DataStructures, ArrayTypes } from "@Utils/data-types";
import { IArray } from "@Interface/specific/IArray";
import { StaticArray } from "@DataStructure/array/static-array";
import { DynamicArray } from "@DataStructure/array/dynamic-array";
import { Errors } from "@Utils/errors";

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

    constructor(capacity: number = 10, protected type: DataStructures = ArrayTypes.Static) {
        this._buildStack(type, capacity);
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


    protected _buildStack(type: DataStructures, capacity: number) {
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

