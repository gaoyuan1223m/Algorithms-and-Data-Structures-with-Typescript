
export interface HashClassInterface<T> {
    hashCode(): number;
    equals(key: T): boolean;
}

export interface IHash<T> {
    [key: number]: T
}

export interface IDictionary<K, V> {
    readonly size: number;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): this;
    print(): void;
    clear(): void;
    forEach(callbackfn: (value: V, key: K, dict: IDictionary<K, V>) => void, thisArg?: any): void
}
