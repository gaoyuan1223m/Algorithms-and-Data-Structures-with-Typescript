
export interface IDeque<T> {

    readonly peek: T;

    readonly tail: T;

    addPeek(value: T): this;

    popPeek(): T;

    addTail(value: T): this;

    popTail(): T;
}
