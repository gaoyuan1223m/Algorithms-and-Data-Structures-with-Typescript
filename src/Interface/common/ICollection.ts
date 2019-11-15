
export interface ICollection {

    readonly size: number;

    contains(value: number | string | boolean | Object): boolean;

    isEmpty():boolean;

    print(): void;

    clear(): void;
}

export interface IGenericCollection<T> {

    readonly size: number;

    contains(value: T): boolean;

    isEmpty():boolean;

    print(): void;

    clear(): void;
}