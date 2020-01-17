import { IDictionary, IHash } from "@Interface/specific";
import { Console } from "@Utils/emphasize";
import { Errors } from "@Utils/error-handling";

export class Dictionary<K, V> implements IDictionary<K, V> {

    private _size: number;
    private _hashKeyAndValueMap: IHash<V>;
    private _hasdKeyAndOriginalKeyMap: IHash<K>;

    get size(): number {
        return this._size;
    }

    constructor() {
        this._initMaps();
    }

    clear(): this {
        return this._initMaps();
    }

    del(key: K): boolean {

        if (!this.has(key)) {
            throw new Errors.InvalidArgument(Errors.Msg.InvalidDictKey);
        }

        const hashKey = this._hashCode(key);

        delete this._hashKeyAndValueMap[hashKey];
        delete this._hasdKeyAndOriginalKeyMap[hashKey];

        this._size -= 1;

        return true;
    }

    get(key: K): V {
        const value = this._hashKeyAndValueMap[this._hashCode(key)];
        return value ? value : null;
    }

    has(key: K): boolean {
        return !!this._hashKeyAndValueMap[this._hashCode(key)];
    }

    set(key: K, value: V): this {

        const hashKey = this._hashCode(key);

        this._hashKeyAndValueMap[hashKey] = value;
        this._hasdKeyAndOriginalKeyMap[hashKey] = key;

        this._size += 1;
        return this;
    }


    forEach(callbackfn: (value: V, key: K, dict: IDictionary<K, V>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): this {

        let pair = "";

        for (const hashKey in this._hashKeyAndValueMap) {
            if (!this._hashKeyAndValueMap.hasOwnProperty(hashKey)) continue;

            if (!this._hasdKeyAndOriginalKeyMap[hashKey]) continue;

            pair += `\t${this._hasdKeyAndOriginalKeyMap[hashKey]} => ${this._hashKeyAndValueMap[hashKey]},\n `;
        }

        Console.OK(`{ \n${pair} }`);

        return this;
    }


    private _hashCode(key: K): number {

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

    private _initMaps(): this {
        this._size = 0;
        this._hashKeyAndValueMap = {} as IHash<V>;
        this._hasdKeyAndOriginalKeyMap = {} as IHash<K>;
        return this;
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