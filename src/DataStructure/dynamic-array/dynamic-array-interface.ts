
export interface IArray<T> {
    readonly size: number;
    get(index: number): T;
    insert(value: T, index: number): this;
    update(value: T, index: number): this;
    remove(index: number): this;
    isEmpty(): boolean;
    print(): void;
    clear(): void;
}