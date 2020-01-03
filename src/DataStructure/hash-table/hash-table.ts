import { ILinkedList } from "@Interface/specific";
import { HashInterface } from "./hash-table-interface";
import { LinkedListFactory } from "@DataStructure/linked-list";
import { ListTypes } from "@Utils/types";

export class Dictionary<K, V> implements HashInterface<K, V> {

    private _capacity: number;
    private _size: number;
    private _array: Array<ILinkedList<V>>;
    private _keys: Array<K>;
    private _values: Array<V>;

    get size(): number {
        return this._size;
    }

    /** 
     * @param capacity Prime Number would be peferred
     */
    constructor(capacity: number) {
        this._capacity = capacity;
        this._array = new Array<ILinkedList<V>>(capacity);
        this._keys = [];
        this._values = [];

        for (let i = 0; i < this._capacity; i++) {
            this._array[i] = LinkedListFactory.create<V>(ListTypes.Singly);
        }
    }

    public clear(): void {

    }

    public delete(key: K): boolean {
        return false
    }

    public forEach(callbackfn: (value: V, key: K, dict: Dictionary<K, V>) => void, thisArg?: any): void {

    }

    public get(key: K): V | undefined {
        const i = this._getIndex(key);

        if (this._array[i].isEmpty()) return undefined;


        return undefined;
    }

    public has(key: K): boolean {
        return !this._array[this._getIndex(key)].isEmpty();
    }

    public set(key: K, value: V): this {
        this._array[this._getIndex(key)].append(value);
        return this;
    }

    public print(): void {
        for (const item of this._array) {
            item.print();
        }
    }

    private _getIndex(key: K): number {
        const s = key.toString();
        // console.log(`s: ${s}`);
        const hc = this._hashCode(s);
        // console.log(`hc: ${hc}`);
        // console.log(`index: ${hc % this._capacity}`);
        return hc % this._capacity;
    }

    private _hashCode(str: string): number {

        const len: number = str.length;

        let hash: number = 0;
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


/**
 * @Data_Member
 *
 * @Operations
 *
 * @Hash
 *
 * @Collisions碰撞_Resolution
 *      *R1: Open Address*
 *          *-> Linear Probing线性探索， 找下一个地址 最差O(n)， 会产生primary clustering*
 *          *-> Quadratic Probing平方探索， 会产生second clustering*
 *      *R2: Separate Chain*
 *          *-> 建立链表，最差O(n)*
 *      *抽屉越满->查找效率越低 ->Load factor: 一个抽屉中元素/Table Size (2/3为上限 python) -> Table Size变化的时候需要 Re-Hash*
 *
 * *所有的进入HASH魔法盒都将转换成Integer, 再进行HASH Function, 得到HASHCODE, 取余数组长度*
 * *1. key is Int, key(output) is key(input)*
 * *2. key is Float, key(output) is key的整数部分 × prime + 小数部分*
 * *3. key is String, key(output) is ASCII A->66, ABC -> (A × prime + B) × prime + C, [Horner's Rule] e.g.*
 */
/**
 * *1->49*
 * *A->65*
 * *Z->90*
 * *a->97*
 * *z->122*
 * *!->33*
 */