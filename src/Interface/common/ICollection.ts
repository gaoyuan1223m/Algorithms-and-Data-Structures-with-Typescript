
export interface ICollection {

    readonly size: number;

    contains(value: number | string | boolean | Object): boolean;

    isEmpty():boolean;

    print(): void;

    clear(): void;
}
