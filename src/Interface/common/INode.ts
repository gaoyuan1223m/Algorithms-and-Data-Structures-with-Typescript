import { IComparable } from "./IComparable";

export interface INode<T> {
    value: T;
}

export interface IKeyValPair<K, V> extends INode<V> {
    key: K
}

export interface IMapNode<K, V> extends IComparable<IMapNode<K, V>> {
    readonly key: K;
    value: V;

    toString(): string;
}