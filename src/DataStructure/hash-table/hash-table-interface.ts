import { Dictionary } from "./hash-table";

export interface HashClassInterface<T> {
    hashCode(): number;
    equals(key: T): boolean;
}

export interface HashInterface<K, V> {
    readonly size: number;
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): this;
    print(): void;
    forEach(callbackfn: (value: V, key: K, dict: Dictionary<K, V>) => void, thisArg?: any): void
}
