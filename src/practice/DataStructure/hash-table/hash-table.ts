



export class Dictionary<K, V> {

    constructor() {

    }

    public clear(): void {

    }
    public delete(key: K): boolean {
        return false
    }
    public forEach(callbackfn: (value: V, key: K, dict: Dictionary<K, V>) => void, thisArg?: any): void {

    };
    public get(key: K): V | undefined {
        return undefined
    }
    public has(key: K): boolean {
        return false
    }

    public set(key: K, value: V): this {
        return this
    }

    readonly size: number;

    private hashcode = (v: K): number => {
        const s: string = v.toString();
        let hash: number = 0;
        if (s.length == 0) {
            return hash;
        }
        for (let i = 0; i < s.length; i++) {
            let char = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}


/**
 * @Data_Member
 * 
 * @Operations
 * 
 * @Hash
 * 
 * @Collisions碰撞
 *      *R1: Open Address*
 *      *R2: *
 * 
 * @Resolution
 * 
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