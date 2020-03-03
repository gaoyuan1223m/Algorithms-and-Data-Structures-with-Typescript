import { ICollectionBase } from "@Interface/common";
import { TreeNodeColor } from "@Utils/types";
import { ICompareFunc } from "@Utils/compare";

export interface HashClassInterface<T> {
    hashCode(): number;
    equals(key: T): boolean;
}

export interface IMap<K = string, V = string> extends ICollectionBase {
    /**
     * *Delete key-value pair if it is existed ans return the corresponding value*
     * @param key the primary index of the key-value pair
     * @exception throw InvalidArg exception if the key is invalid
     */
    del(key: K): V;

    /**
     * *Get value by the key of the key-value pair, if key is not existed, return NULL*
     * @param key the primary index of the key-value pair
     * @exception throw InvalidArg exception if the key is invalid
     */
    get(key: K): V;

    /**
     * *Return TRUE is key-value pair is existed, else FALSE*
     * @param key the primary index of the key-value pair
     * @exception throw InvalidArg exception if the key is invalid
     */
    has(key: K): boolean;

    /**
     * *Add key-value pair to the current Dictionary*
     * @param key the primary index of the key-value pair
     * @param value the primary vale of the key-value pair to add to the MAP
     */
    set(key: K, value: V): this;

    forEach(callbackfn: (value: V, key: K, IMap: IMap<K, V>) => void, thisArg?: any): void
}

export interface ISet<T = string> extends ICollectionBase {

    /**
     * *Add value to the Set, if the value is existed, value will be ignored*
     * @param value element to add
     */
    add(value: T): this;

    /**
     * *Delete value from the Set and return TRUE if seccessfully, else FALSE*
     * @param value element to delete
     */
    del(value: T): boolean;

    /**
     * *Return TRUE if the value is existed, else FALSE*
     * @param value element to search
     */
    has(value: T): boolean;

    /**
     * 
     * @param callbackfn 
     * @param thisArg 
     */
    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
}

export interface ITreeMapNode<K, V> {
    key: K;
    value: V;
    left: ITreeMapNode<K, V>;
    right: ITreeMapNode<K, V>;
    parent: ITreeMapNode<K, V>;
    color: TreeNodeColor;

    isLeftChild(compare: ICompareFunc<K>): boolean;
    isRightChild(compare: ICompareFunc<K>): boolean;
    isLeaf(): boolean;
    isRed(): boolean;
    isBlack(): boolean;
    setRed(): void;
    setBlack(): void;
    getUncle(compare: ICompareFunc<K>): ITreeMapNode<K, V>
    getSibling(compare: ICompareFunc<K>): ITreeMapNode<K, V>;
}
