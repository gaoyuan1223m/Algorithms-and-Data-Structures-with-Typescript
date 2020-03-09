import { ISet, IMap } from "@Interface/specific";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { TreeMap } from "./tree-map";
import { Console } from "@Utils/emphasize";

export class TreeSet<T> implements ISet<T> {

    protected _treeMap: IMap<T, boolean>;

    constructor(private compare: ICompareFunc<T> = valueTypeComparison) {
        this._treeMap = new TreeMap<T, boolean>(compare);
    }

    get size(): number {
        return this._treeMap.size;
    }

    add(value: T): this {
        this._treeMap.set(value, true);
        return this;
    }

    del(value: T): boolean {
        return !!this._treeMap.del(value);
    }

    has(value: T): boolean {
        return this._treeMap.has(value);
    }

    forEach(callbackfn: (value: T, set: ISet<T>) => void, thisArg?: any): void {
        const elements = this._getElements();
        for (const e of elements) {
            callbackfn(e, this);
        }
    }

    isEmpty(): boolean {
        return this._treeMap.isEmpty();
    }

    print(): this {
        Console.Warn(`[${this._getElements()}]`);
        return this;
    }

    clear(): this {
        this._treeMap.clear();
        return this;
    }

    private _getElements(): Array<T> {
        const arr: Array<T> = [];
        this._treeMap.forEach(v => { arr.push(v) });
        return arr;
    }

}