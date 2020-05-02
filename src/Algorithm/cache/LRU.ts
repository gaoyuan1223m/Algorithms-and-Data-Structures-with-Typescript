
export class LRUCache<K, V> {
    private cache: Map<K, V>;
    private capacity: number;

    constructor(capacity: number) {
        this.cache = new Map<K, V>()
        this.capacity = capacity;
    }

    public get(key: K): V {
        if (!this.cache.has(key)) return null;

        const temp = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, temp);
        return temp;
    }

    public put(key: K, val: V) {
        if (this.cache.has(key)) {
            // 存在即更新（删除后加入）
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // 不存在即加入
            // 缓存超过最大值，则移除最近没有使用的
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, val);
    }
}

const cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
console.log(cache.get(2));       // 返回 null (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
console.log(cache.get(1));       // 返回 null (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4

