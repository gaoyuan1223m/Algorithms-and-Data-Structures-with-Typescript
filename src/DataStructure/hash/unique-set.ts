import { IUniqueSet, IHash } from "@Interface/specific";
import { Errors } from "@Utils/error-handling";
import { Console } from "@Utils/emphasize";

export class UniqueSet<T> implements IUniqueSet<T> {

    private _size: number;
    private _map: IHash<T>;

    get size(): number {
        return this._size;
    }

    constructor() {
        this._initSet();
    }

    add(value: T): this {
        const hashKey = this._hashCode(value);

        if (this._map[hashKey]) return this;

        this._map[hashKey] = value;
        this._size += 1;

        return this;
    }

    del(value: T): boolean {
        const hashKey = this._hashCode(value);

        if (!this._map[hashKey]) throw new Errors.InvalidArgument(Errors.Msg.NotExisted);

        delete this._map[hashKey];

        return true
    }

    has(value: T): boolean {
        return !!this._map[this._hashCode(value)];
    }

    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): this {
        let str = ""

        for (const key in this._map) {
            if (!this._map.hasOwnProperty(key)) continue;

            str += `${this._map[key]} `
        }

        Console.Warn(`< ${str}>`);

        return this;
    }

    clear(): this {
        return this._initSet();
    }

    private _initSet(): this {
        this._size = 0;
        this._map = {} as IHash<T>;
        return this;
    }

    private _hashCode(key: T): number {

        const str = key.toString();
        const len = str.length;

        let hash = 0;
        if (len == 0) {
            return hash;
        }

        for (let i = 0; i < len; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        return Math.abs(hash);
    }
}