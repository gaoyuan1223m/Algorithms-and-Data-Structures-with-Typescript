export interface IEnumerable<T> {
    GetEnumerator(): IEnumerator<T>; 
}

export interface IEnumerator<T> {
    readonly hasNext: boolean;
    readonly current: T;
}